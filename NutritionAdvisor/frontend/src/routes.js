import React from 'react';
import { Route } from 'react-router-dom';
import DietPlanList from './containers/DietPlanListView'
import DietPlanDetail from './containers/DietPlanDetailedView'
import FoodList from './containers/FoodListView';
import FoodDetail from './containers/FoodDetailedView';
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
    <div>
        <Route exact path='/foods/' component={FoodList} />{" "}
        <Route exact path='/foods/:foodID' component={FoodDetail} />{" "}
        <Route exact path='/plans/' component={DietPlanList} />{" "}
        <Route exact path='/plans/:planID' component={DietPlanDetail} />{" "}
        <Route exact path="/login/" component={Login} />{" "} 
        <Route exact path="/signup/" component={Signup} />{" "}
    </div>
);

export default BaseRouter;