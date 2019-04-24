import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './component/App/App';
import GroupStore from './store/GroupStore';

const groupStore = new GroupStore();

// tslint:disable:max-line-length object-literal-key-quotes
groupStore.setUsers([{ 'id': 1, 'name': 'Пользователь 1', 'group': 1 }, { 'id': 2, 'name': 'Пользователь 2', 'group': 1 }, { 'id': 3, 'name': 'Пользователь 3', 'group': 2 }, { 'id': 4, 'name': 'Пользователь 4', 'group': 5 }, { 'id': 5, 'name': 'Пользователь 5', 'group': 2 }, { 'id': 6, 'name': 'Пользователь 6', 'group': 5 }, { 'id': 7, 'name': 'Пользователь 7', 'group': 2 }, { 'id': 8, 'name': 'Пользователь 8', 'group': 1 }, { 'id': 9, 'name': 'Пользователь 9', 'group': 3 }]);
groupStore.setGroups([{ 'id': 1, 'name': 'Группа 1' }, { 'id': 2, 'name': 'Группа 2' }, { 'id': 3, 'name': 'Группа 3' }, { 'id': 4, 'name': 'Группа 4' }, { 'id': 5, 'name': 'Группа 5' }]);
groupStore.setValue({ 'users': [3, 6], 'groups': [1, 4] });
// tslint:enable:max-line-length object-literal-key-quotes

ReactDOM.render(
  React.createElement(App, { groupStore }),
  document.getElementById('root'),
);
