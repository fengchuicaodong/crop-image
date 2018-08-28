/**
 * Created by liumanli on 2018/8/28.
 */
import React from 'react';
import Header from './Header';
import Content from './Content';
import Sidebar from './Siderbar';
import '../style/app.css';
import 'antd/dist/antd.css'

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <Sidebar/>
                <Content/>
            </div>
        )
    }
}
export default App;