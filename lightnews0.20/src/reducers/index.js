import user from './user';
import newsList from './newsList';
import newsContent from './newsContent';
import {combineReducers} from 'redux';

const appLN = combineReducers({
    user,
    newsList,
    newsContent
});

export default appLN;