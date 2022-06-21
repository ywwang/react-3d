import { Html } from '@react-three/drei'

const HtmlContent = (props) => (<Html className="content" transform occlude>
              <div className="wrapper" style={{fontSize:20}} onClick={props.onClick}>
                Hello world!!!<br/>
                Hello world!!!<br/>
                Hello world!!!<br/>
                Hello world!!!<br/>
                Hello world!!!<br/>
                Hello world!!!<br/>

              </div>
            </Html>);

            export default HtmlContent;