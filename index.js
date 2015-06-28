var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var SMS  = require('./SMS/SMS');
var LOG = require('./LOG/LOG');
var EMAIL = require('./EMAIL/EMAIL');

var AMUIReact = require('amazeui-react');
var {Grid, Col} = AMUIReact;

var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var {AppBar, Menu, Paper} = mui;

injectTapEventPlugin();
var App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState:function(){
    return {
      MenuItems:[
        { route: 'sms', text: 'SMS'},
        { route: 'email', text: 'EMAIL'},
        { route: 'log', text: 'LOG'}
      ]
    }
  },
  render: function () {

    return (
      <div>
        <AppBar title='Study Material React UI' />
        <Grid className="doc-g" collapse>
          <Col sm={6} md={4} lg={2}>
            <Menu
              menuItems={this.state.MenuItems}
              autoWidth={false}
              zDepth={0}
              selectedIndex={this._getSelectedIndex()}
              onItemTap={this._onMenuItemClick}
            />
          </Col>
          <Col sm={6} md={8} lg={10}>
            <Paper zDepth={3}>
              <RouteHandler />
            </Paper>
          </Col>
        </Grid>
      </div>
    );
  },

  _onMenuItemClick:function(e,index,item){
    this.context.router.transitionTo(item.route);
  },

  _getSelectedIndex: function() {
    var MenuItems = this.state.MenuItems;
    var currentItem;

    for (var i = MenuItems.length - 1; i >= 0; i--) {
      currentItem = MenuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },
});




var routes = (
  <Route handler={App}>
    <DefaultRoute handler={SMS}/>
    <Route name="sms" path="sms" handler={SMS} />
    <Route name="email" path="email" handler={EMAIL} />
    <Route name="log" path="log" handler={LOG} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
