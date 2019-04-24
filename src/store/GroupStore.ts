import { observable, action } from 'mobx';

export type User = {
  id: number,
  name: string,
  group: number,
};

export type Group = {
  id: number,
  name: string,
};

export type Value = {
  users: number[],
  groups: number[],
};

class GroupStore {
  @observable public users: User[] = [];
  @observable public groups: Group[] = [];
  @observable public value: Value = {
    users: [],
    groups: [],
  };

  @action
  public setUsers = (users: User[]) => {
    this.users = users;
  }

  @action
  public setGroups = (groups: Group[]) => {
    this.groups = groups;
  }

  @action
  public setValue = (value: Value) => {
    this.value = value;
  }
}

export default GroupStore;
