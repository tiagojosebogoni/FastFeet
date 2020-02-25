import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import ListDelivery from '../pages/Delivery/List';
/*
import StoreStudent from '../pages/Student/Store';
import StorePlan from '../pages/Plan/Store';
import ListPlan from '../pages/Plan/List';
import RegisterStore from '../pages/Register/Store';
import RegisterList from '../pages/Register/List';
import HelpOrder from '../pages/HelpOrder/List'; */

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/delivery/list" isPrivate component={ListDelivery} />
      {/*
      <Route path="/student/store" isPrivate component={StoreStudent} />

      <Route path="/plan/list" isPrivate component={ListPlan} />
      <Route path="/plan/store" isPrivate component={StorePlan} />

      <Route path="/register/list" isPrivate component={RegisterList} />
      <Route path="/register/store" isPrivate component={RegisterStore} />

      <Route path="/helpOrder" isPrivate component={HelpOrder} />
      <Route path="/" component={() => <h1>404</h1>} />
*/}
    </Switch>
  );
}
