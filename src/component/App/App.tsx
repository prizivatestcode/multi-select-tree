import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import MultiSelectTree from '../MultiSelectTree/MultiSelectTree';
import Editor from '../Editor/Editor';
import GroupStore from '../../store/GroupStore';

const AppContainer = styled.div`
  width: 100%;
  min-width: 500px;
  height: 100vh;

  display: flex;
  align-items: flex-start;

  background-color: lightgray;
  padding-top: 1em;

  > * {
    margin-left: 2em;

    &:first-child{
    margin-left: 1em;
   }
  }
`;

type Props = {
  groupStore: GroupStore,
};

@observer
class App extends React.Component<Props> {

  public render() {

    const { groupStore } = this.props;

    return (
      <AppContainer>
        <MultiSelectTree
          users={groupStore.users}
          groups={groupStore.groups}
          value={groupStore.value}
          onChange={value => groupStore.setValue(value)}
        />
        <Editor groupStore={groupStore} />
      </AppContainer>
    );
  }
}

export default App;
