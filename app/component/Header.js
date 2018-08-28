/**
 * Created by liumanli on 2018/8/28.
 */
import React from 'react';
import Avatar from '../images/avatar.jpg';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-con">
                    <div className="user">
                        <span className="text">欢迎您！</span>
                        <span className="avatar">
                            <img src={Avatar} alt="" />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;