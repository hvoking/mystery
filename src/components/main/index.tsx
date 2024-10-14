// App imports
import { Maps } from './maps';
import { Wrapper } from './wrapper';
import './styles.scss';

// Context imports
import { MainProvider } from '../context';

export const Main = () => (
  <MainProvider>
    <Wrapper>
      <div className="main">
        <Maps/>
      </div>
    </Wrapper>
  </MainProvider>
)

Main.displayName="Main";