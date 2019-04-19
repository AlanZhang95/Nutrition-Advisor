import React from 'react';
import { Route } from 'react-router-dom';
import DietPlanList from './containers/DietPlanListView';
import DietPlanDetail from './containers/DietPlanDetailedView';
import FoodList from './containers/FoodListView';
import FoodDetail from './containers/FoodDetailedView';
import UserDetail from './containers/UserDetailedView';
import SelectFood from './containers/SelectFoodView';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Recommend from "./containers/Recommend";

const BaseRouter = () => (
    <div>
        <Route exact path='/foods/' component={FoodList} />{" "}
        <Route exact path='/foods/:foodID' component={FoodDetail} />{" "}
        <Route exact path='/plans/' component={DietPlanList} />{" "}
        <Route exact path='/plans/:planID' component={DietPlanDetail} />{" "}
        <Route exact path='/plans/:planID/select' component={SelectFood} />{" "}
        <Route exact path='/users/:userID' component={UserDetail} />{" "}
        <Route exact path="/login/" component={Login} />{" "} 
        <Route exact path="/signup/" component={Signup} />{" "}
        <Route exact path="/recommend/" component={Recommend} />{" "}

    </div>
);

export default BaseRouter;
