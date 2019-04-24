import * as React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { TextField, Button, Typography } from '@material-ui/core';
import GroupStore, { User, Group } from '../../store/GroupStore';

const FormContainer = styled.div`
  width: 500px;
  padding: 2em;

  > * {
    margin-top: 1em;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;

  > * {
    width: 100%;
  }
`;

const UserCheckContainer = styled.div`
  display: flex;
  align-items: flex-end;

  > * {
    margin-left: 1em;

    &:first-child {
      margin-left: 0;
    }
  }
`;

type Props = {
  groupStore: GroupStore,
};

type State = {
  isUserSelected: boolean | undefined,
};

class Editor extends React.Component<Props, State> {

  private userIdRef = React.createRef<HTMLInputElement>();

  public state = {
    isUserSelected: undefined,
  };

  public updateUsers = (evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const users = JSON.parse(evt.target.value) as User[];
      this.props.groupStore.setUsers(users);
    } catch (err) {

    }
  }

  public updateGroups = (evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const groups = JSON.parse(evt.target.value) as Group[];
      this.props.groupStore.setGroups(groups);
    } catch (err) {

    }
  }

  private getIsUserSelected = (): boolean | undefined => {
    const userId = Number(this.userIdRef.current!.value);

    const { groups: selectedGroups, users: selectedUsers } = this.props.groupStore.value;
    const users = this.props.groupStore.users;

    if (isNaN(userId)) {
      return undefined;
    }

    const user = users.find(userInternal => userInternal.id === userId);

    if (user === undefined) {
      return undefined;
    }

    return selectedUsers.some(selectedUserId => selectedUserId === userId)
      || selectedGroups.some(groupId => groupId === user.group);
  }

  private checkUserId = () => {
    this.setState({
      isUserSelected: this.getIsUserSelected(),
    });
  }

  public render() {

    const { isUserSelected } = this.state;

    return (
      <Paper>
        <FormContainer>
          <InputContainer>
            <TextField
              label="Users"
              defaultValue={JSON.stringify(this.props.groupStore.users)}
              onChange={this.updateUsers}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              label="Groups"
              defaultValue={JSON.stringify(this.props.groupStore.groups)}
              onChange={this.updateGroups}
            />
          </InputContainer>
          <InputContainer>
            <TextField
              label="Value"
              disabled
              value={JSON.stringify(this.props.groupStore.value)}
            />
          </InputContainer>
          <UserCheckContainer>
            <div><TextField label="User ID" inputRef={this.userIdRef} /></div>
            <div><Button variant="contained" color="primary" type="button"
              onClick={this.checkUserId}>Check</Button></div>
            <div><Typography variant="h6">{
              isUserSelected === true ? 'Selected'
                : isUserSelected === false ? 'Not Selected'
                  : ''
            }</Typography></div>
          </UserCheckContainer>
        </FormContainer>
      </Paper>
    );
  }
}

export default Editor;
