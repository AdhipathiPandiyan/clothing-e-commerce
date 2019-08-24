import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//For memoized selctor(To improve Performance)
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//Redux
import { connect } from 'react-redux';
import { SetCurrentUser } from './redux/user/user.action';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { SetCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          SetCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log(this.state);
        });
      } else {
        SetCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  SetCurrentUser: user => dispatch(SetCurrentUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
