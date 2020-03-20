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
class TopicListView extends Component {

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
                      <div className="col-lg-8 col-xs-12 col-md-8">
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


              <div className="container">
                  <div className="row">
                      <div className="col-lg-8 col-md-8">

                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar.jpg" alt="" />
                                          <div className="status green">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon1.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">10 Kids Unaware of Their Halloween Costume</a></h2>
                                      <p>It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          560
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 24 min</div>
                              </div>
                              <div className="clearfix"></div>
                          </div>



                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar2.jpg" alt="" />
                                          <div className="status red">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon3.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" /><img src="/src/containers/App/styles/img/icon5.jpg" alt="" /><img src="/src/containers/App/styles/img/icon6.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">What Instagram Ads Will Look Like</a></h2>
                                      <p>Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          89
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 15 min</div>
                              </div>
                              <div className="clearfix"></div>
                          </div>



                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar3.jpg" alt="" />
                                          <div className="status red">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon2.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">The Future of Magazines Is on Tablets</a></h2>
                                      <p>Eric Schmidt has seen the future of magazines, and it's on the tablet. At a Magazine Publishers Association.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          456
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 2 days</div>
                              </div>
                              <div className="clearfix"></div>
                          </div>



                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar4.jpg" alt="" />
                                          <div className="status yellow">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon1.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" /><img src="/src/containers/App/styles/img/icon6.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">Pinterest Now Worth $3.8 Billion</a></h2>
                                      <p>Pinterest's valuation is closing in on $4 billion after its latest funding round of $225 million, according to a report.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          78
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 24 min</div>
                              </div>
                              <div className="clearfix"></div>
                          </div>




                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar.jpg" alt="" />
                                          <div className="status green">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon1.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">10 Kids Unaware of Their Halloween Costume</a></h2>
                                      <p>It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          560
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 24 min</div>
                              </div>
                              <div className="clearfix"></div>
                          </div>

                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar2.jpg" alt="" />
                                          <div className="status red">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon3.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" /><img src="/src/containers/App/styles/img/icon5.jpg" alt="" /><img src="/src/containers/App/styles/img/icon6.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">What Instagram Ads Will Look Like</a></h2>
                                      <p>Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          89
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 15 min</div>
                              </div>
                              <div className="clearfix"></div>
                          </div>



                          <div className="post">
                              <div className="wrap-ut pull-left">
                                  <div className="userinfo pull-left">
                                      <div className="avatar">
                                          <img src="/src/containers/App/styles/img/avatar3.jpg" alt="" />
                                          <div className="status red">&nbsp;</div>
                                      </div>

                                      <div className="icons">
                                          <img src="/src/containers/App/styles/img/icon2.jpg" alt="" /><img src="/src/containers/App/styles/img/icon4.jpg" alt="" />
                                      </div>
                                  </div>
                                  <div className="posttext pull-left">
                                      <h2><a href="02_topic.html">The Future of Magazines Is on Tablets</a></h2>
                                      <p>Eric Schmidt has seen the future of magazines, and it's on the tablet. At a Magazine Publishers Association.</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="postinfo pull-left">
                                  <div className="comments">
                                      <div className="commentbg">
                                          456
                                          <div className="mark"></div>
                                      </div>

                                  </div>
                                  <div className="views"><i className="fa fa-eye"></i> 1,568</div>
                                  <div className="time"><i className="fa fa-clock-o"></i> 2 days</div>
                              </div>
                              <div className="clearfix"></div>
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
                      <div className="col-lg-8 col-xs-12">
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

TopicListView.defaultProps = {};

TopicListView.propTypes = {};

export default withStyles(styles)(TopicListView);
