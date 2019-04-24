import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { User, Group, Value } from '../../store/GroupStore';
import { MenuItem, Checkbox, ListItemText, List } from '@material-ui/core';
import styled from 'styled-components';
import { toJS } from 'mobx';

enum MenuItemType { Group, User }

const ListContainer = styled.div`
  width: 400px;
`;

const UserItemContainer = styled.div`
  padding-left: 2em;
`;

type Props = {
  users: User[],
  groups: Group[],
  value: Value,
  onChange: (value: Value) => void,
};

class MultiSelectTree extends React.Component<Props> {

  private convertToGroupTree = (users: User[], groups: Group[]) =>
    groups.map(group => ({
      id: group.id,
      name: group.name,
      users: users.filter(user => user.group === group.id),
    }))

  private toggleValue = (type: MenuItemType, id: number) => {
    const newValues = type === MenuItemType.Group ? this.toggleGroupValue(id) : this.toggleUserValue(id);
    this.props.onChange.call(undefined, newValues);
  }

  // When we toggle a group
  private toggleGroupValue = (id: number): Value => {
    const value = toJS(this.props.value);
    const users = toJS(this.props.users);

    const groupIndex = this.props.value.groups.indexOf(id);
    const usersInGroup = users.filter(user => user.group === id).map(user => user.id);

    // We delete all users from user list because now they are controlled by the group logic
    value.users = value.users.filter(userId => !usersInGroup.includes(userId));

    if (groupIndex !== -1) {
      value.groups.splice(groupIndex, 1);
    } else {
      value.groups.push(id);
    }

    return value;
  }

  // When we toggle a user
  private toggleUserValue = (id: number): Value => {
    const value = toJS(this.props.value);
    const users = toJS(this.props.users);

    const user = users.find(userObj => userObj.id === id)!;
    const userIndex = value.users.indexOf(id);
    const groupIndex = value.groups.indexOf(user.group);
    const usersInGroup = users
      .filter(userInternal => user.group === userInternal.group)
      .map(userInternal => userInternal.id);

    const isGroupSelected = groupIndex !== -1;
    const isUserSelected =
      value.users.some(userId => id === userId)
      || value.groups.some(groupId => groupId === user.group);

    // Depends on if a user or a group are selected
    if (isUserSelected) {
      if (isGroupSelected) {
        // User and group were selected so we delete group from values and add all users
        value.groups.splice(groupIndex, 1);
        value.users = [...value.users, ...(usersInGroup.filter(userId => userId !== id))];
      } else {
        value.users.splice(userIndex, 1);
      }
    } else {
      value.users.push(id);

      // Check if all users in the group are selected so we can simple delete users and just check group
      if (usersInGroup.reduce((result, userInGroupId) => result && value.users.includes(userInGroupId), true)) {
        value.groups.push(user.group);
        for (const userId of usersInGroup) {
          const internalUserIndex = value.users.indexOf(userId);
          if (internalUserIndex !== -1) {
            value.users.splice(internalUserIndex, 1);
          }
        }
      }
    }

    return value;
  }

  public render() {

    const groupTree = this.convertToGroupTree(
      this.props.users,
      this.props.groups,
    );

    const { groups: selectedGroups, users: selectedUsers } = this.props.value;

    return (
      <Paper elevation={1}>
        <ListContainer>
          <List>
            {groupTree.map(group => (
              <React.Fragment key={group.id}>
                <MenuItem onClick={() => this.toggleValue(MenuItemType.Group, group.id)}>
                  <Checkbox checked={selectedGroups.some(groupId => groupId === group.id)} />
                  <ListItemText primary={group.name} />
                </MenuItem>
                {
                  group.users.map(user => (
                    <UserItemContainer key={user.id}>
                      <MenuItem onClick={() => this.toggleValue(MenuItemType.User, user.id)}>
                        <Checkbox
                          checked={
                            selectedUsers.some(userId => userId === user.id)
                            || selectedGroups.some(groupId => groupId === user.group)}
                        />
                        <ListItemText primary={user.name} />
                      </MenuItem>
                    </UserItemContainer>
                  ))
                }
              </React.Fragment>
            ))}
          </List>
        </ListContainer>
      </Paper>
    );
  }
}

export default MultiSelectTree;
