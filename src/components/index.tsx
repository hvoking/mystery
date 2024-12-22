// App imports
import { Maps } from './maps';
import { Wrapper } from './wrapper';
import './styles.scss';

export const Main = () => (
  <Wrapper>
    <div className="main">
      <Maps/>
    </div>
  </Wrapper>
)

Main.displayName="Main";