/* eslint camelcase: 0, no-underscore-dangle: 0, react/jsx-indent-props: 0, max-len: 0, react/forbid-prop-types: 0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';

// import {  } from '../../../utils/misc';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: '#ecf0f1',
    },
});

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {},
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class TopicDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps) { }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false;
        }
        return true;
    }

    render() {
        const { classes } = this.props;

        return (
          <section className={classes.root}>
          <div className="container">
                <div className="row">
                    <div className="col-lg-8 breadcrumbf">
                        <a href="#">Borderlands 2</a> <span className="diviver">&gt;</span> <a href="#">General Discussion</a> <span className="diviver">&gt;</span> <a href="#">Topic Details</a>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8">


                        <div className="post beforepagination">
                            <div className="topwrap">
                                <div className="userinfo pull-left">
                                    <div className="avatar">
                                        <img src="images/avatar.jpg" alt="" />
                                        <div className="status green">&nbsp;</div>
                                    </div>

                                    <div className="icons">
                                        <img src="images/icon1.jpg" alt="" /><img src="images/icon4.jpg" alt="" /><img src="images/icon5.jpg" alt="" /><img src="images/icon6.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="posttext pull-left">
                                    <h2>10 Kids Unaware of Their Halloween Costume</h2>
                                    <p>Today, we're looking at three particularly interesting stories. Pinterest added a new location-based feature on Wednesday that uses Place Pins as a way to map out vacations and favorite areas. Southwest Airlines is providing Wi-Fi access from gate to gate for $8 per day through an onboard hotspot. And in an effort to ramp up its user base, Google Wallet is offering a debit card that can take out cash from.</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="postinfobot">

                                <div className="likeblock pull-left">
                                    <a href="#" className="up"><i className="fa fa-thumbs-o-up"></i>25</a>
                                    <a href="#" className="down"><i className="fa fa-thumbs-o-down"></i>3</a>
                                </div>

                                <div className="prev pull-left">
                                    <a href="#"><i className="fa fa-reply"></i></a>
                                </div>

                                <div className="posted pull-left"><i className="fa fa-clock-o"></i> Posted on : 20 Nov @ 9:30am</div>

                                <div className="next pull-right">
                                    <a href="#"><i className="fa fa-share"></i></a>

                                    <a href="#"><i className="fa fa-flag"></i></a>
                                </div>

                                <div className="clearfix"></div>
                            </div>
                        </div>

                        <div className="paginationf">
                            <div className="pull-left"><a href="#" className="prevnext"><i className="fa fa-angle-left"></i></a></div>
                            <div className="pull-left">
                                <ul className="paginationforum">
                                    <li className="hidden-xs"><a href="#">1</a></li>
                                    <li className="hidden-xs"><a href="#">2</a></li>
                                    <li className="hidden-xs"><a href="#">3</a></li>
                                    <li className="hidden-xs"><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">6</a></li>
                                    <li><a href="#" className="active">7</a></li>
                                    <li><a href="#">8</a></li>
                                    <li className="hidden-xs"><a href="#">9</a></li>
                                    <li className="hidden-xs"><a href="#">10</a></li>
                                    <li className="hidden-xs hidden-md"><a href="#">11</a></li>
                                    <li className="hidden-xs hidden-md"><a href="#">12</a></li>
                                    <li className="hidden-xs hidden-sm hidden-md"><a href="#">13</a></li>
                                    <li><a href="#">1586</a></li>
                                </ul>
                            </div>
                            <div className="pull-left"><a href="#" className="prevnext last"><i className="fa fa-angle-right"></i></a></div>
                            <div className="clearfix"></div>
                        </div>


                        <div className="post">
                            <div className="topwrap">
                                <div className="userinfo pull-left">
                                    <div className="avatar">
                                        <img src="images/avatar2.jpg" alt="" />
                                        <div className="status red">&nbsp;</div>
                                    </div>

                                    <div className="icons">
                                        <img src="images/icon3.jpg" alt="" /><img src="images/icon4.jpg" alt="" /><img src="images/icon5.jpg" alt="" /><img src="images/icon6.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="posttext pull-left">
                                    <p>Typography helps you engage your audience and establish a distinct, unique personality on your website. Knowing how to use fonts to build character in your design is a powerful skill, and exploring the history and use of typefaces, as well as typogra...</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="postinfobot">

                                <div className="likeblock pull-left">
                                    <a href="#" className="up"><i className="fa fa-thumbs-o-up"></i>10</a>
                                    <a href="#" className="down"><i className="fa fa-thumbs-o-down"></i>1</a>
                                </div>

                                <div className="prev pull-left">
                                    <a href="#"><i className="fa fa-reply"></i></a>
                                </div>

                                <div className="posted pull-left"><i className="fa fa-clock-o"></i> Posted on : 20 Nov @ 9:45am</div>

                                <div className="next pull-right">
                                    <a href="#"><i className="fa fa-share"></i></a>

                                    <a href="#"><i className="fa fa-flag"></i></a>
                                </div>

                                <div className="clearfix"></div>
                            </div>
                        </div>




                        <div className="post">
                            <div className="topwrap">
                                <div className="userinfo pull-left">
                                    <div className="avatar">
                                        <img src="images/avatar3.jpg" alt="" />
                                        <div className="status red">&nbsp;</div>
                                    </div>

                                    <div className="icons">
                                        <img src="images/icon3.jpg" alt="" /><img src="images/icon4.jpg" alt="" /><img src="images/icon5.jpg" alt="" /><img src="images/icon6.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="posttext pull-left">

                                    <blockquote>
                                        <span className="original">Original Posted by - theguy_21:</span>
                                        Did you see that Dove ad pop up in your Facebook feed this year? How about the Geico camel one?
                                    </blockquote>
                                    <p>Toronto Mayor Rob Ford does not have a bigger fan than "Anchorman's" Ron Burgundy. In fact, Burgundy wants Ford to be re-elected so much, that he agreed to sing the campaign song Brien. The tune in question ...</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="postinfobot">

                                <div className="likeblock pull-left">
                                    <a href="#" className="up"><i className="fa fa-thumbs-o-up"></i>55</a>
                                    <a href="#" className="down"><i className="fa fa-thumbs-o-down"></i>12</a>
                                </div>

                                <div className="prev pull-left">
                                    <a href="#"><i className="fa fa-reply"></i></a>
                                </div>

                                <div className="posted pull-left"><i className="fa fa-clock-o"></i> Posted on : 20 Nov @ 9:50am</div>

                                <div className="next pull-right">
                                    <a href="#"><i className="fa fa-share"></i></a>

                                    <a href="#"><i className="fa fa-flag"></i></a>
                                </div>

                                <div className="clearfix"></div>
                            </div>
                        </div>




                        <div className="post">
                            <form action="#" className="form" method="post">
                                <div className="topwrap">
                                    <div className="userinfo pull-left">
                                        <div className="avatar">
                                            <img src="images/avatar4.jpg" alt="" />
                                            <div className="status red">&nbsp;</div>
                                        </div>

                                        <div className="icons">
                                            <img src="images/icon3.jpg" alt="" /><img src="images/icon4.jpg" alt="" /><img src="images/icon5.jpg" alt="" /><img src="images/icon6.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="posttext pull-left">
                                        <div className="textwraper">
                                            <div className="postreply">Post a Reply</div>
                                            <textarea name="reply" id="reply" placeholder="Type your message here"></textarea>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="postinfobot">

                                    <div className="notechbox pull-left">
                                        <input type="checkbox" name="note" id="note" className="form-control" />
                                    </div>

                                    <div className="pull-left">
                                        <label for="note"> Email me when some one post a reply</label>
                                    </div>

                                    <div className="pull-right postreply">
                                        <div className="pull-left smile"><a href="#"><i className="fa fa-smile-o"></i></a></div>
                                        <div className="pull-left"><button type="submit" className="btn btn-primary">Post Reply</button></div>
                                        <div className="clearfix"></div>
                                    </div>


                                    <div className="clearfix"></div>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="col-lg-4 col-md-4">


                        <div className="sidebarblock">
                            <h3>Categories</h3>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <ul className="cats">
                                    <li><a href="#">Trading for Money <span className="badge pull-right">20</span></a></li>
                                    <li><a href="#">Vault Keys Giveway <span className="badge pull-right">10</span></a></li>
                                    <li><a href="#">Misc Guns Locations <span className="badge pull-right">50</span></a></li>
                                    <li><a href="#">Looking for Players <span className="badge pull-right">36</span></a></li>
                                    <li><a href="#">Stupid Bugs &amp; Solves <span className="badge pull-right">41</span></a></li>
                                    <li><a href="#">Video &amp; Audio Drivers <span className="badge pull-right">11</span></a></li>
                                    <li><a href="#">2K Official Forums <span className="badge pull-right">5</span></a></li>
                                </ul>
                            </div>
                        </div>


                        <div className="sidebarblock">
                            <h3>Poll of the Week</h3>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <p>Which game you are playing this week?</p>
                                <form action="#" method="post" className="form">
                                    <table className="poll">
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar color1" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '90%'}}>
                                                        Call of Duty Ghosts
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="chbox">
                                                <input id="opt1" type="radio" name="opt" value="1" />
                                                <label for="opt1"></label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar color2" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '63%'}}>
                                                        Titanfall
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="chbox">
                                                <input id="opt2" type="radio" name="opt" value="2" checked />
                                                <label for="opt2"></label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar color3" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}>
                                                        Battlefield 4
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="chbox">
                                                <input id="opt3" type="radio" name="opt" value="3" />
                                                <label for="opt3"></label>
                                            </td>
                                        </tr>
                                    </table>
                                </form>
                                <p className="smal">Voting ends on 19th of October</p>
                            </div>
                        </div>


                        <div className="sidebarblock">
                            <h3>My Active Threads</h3>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                            </div>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <a href="#">Who Wins in the Battle for Power on the Internet?</a>
                            </div>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <a href="#">Sony QX10: A Funky, Overpriced Lens Camera for Your Smartphone</a>
                            </div>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <a href="#">FedEx Simplifies Shipping for Small Businesses</a>
                            </div>
                            <div className="divline"></div>
                            <div className="blocktxt">
                                <a href="#">Loud and Brave: Saudi Women Set to Protest Driving Ban</a>
                            </div>
                        </div>


                    </div>
                </div>
            </div>



            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="pull-left"><a href="#" className="prevnext"><i className="fa fa-angle-left"></i></a></div>
                        <div className="pull-left">
                            <ul className="paginationforum">
                                <li className="hidden-xs"><a href="#">1</a></li>
                                <li className="hidden-xs"><a href="#">2</a></li>
                                <li className="hidden-xs"><a href="#">3</a></li>
                                <li className="hidden-xs"><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">6</a></li>
                                <li><a href="#" className="active">7</a></li>
                                <li><a href="#">8</a></li>
                                <li className="hidden-xs"><a href="#">9</a></li>
                                <li className="hidden-xs"><a href="#">10</a></li>
                                <li className="hidden-xs hidden-md"><a href="#">11</a></li>
                                <li className="hidden-xs hidden-md"><a href="#">12</a></li>
                                <li className="hidden-xs hidden-sm hidden-md"><a href="#">13</a></li>
                                <li><a href="#">1586</a></li>
                            </ul>
                        </div>
                        <div className="pull-left"><a href="#" className="prevnext last"><i className="fa fa-angle-right"></i></a></div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
          </section>
        );
    }
}

TopicDetailView.defaultProps = {};

TopicDetailView.propTypes = {};

export default withStyles(styles)(TopicDetailView);
