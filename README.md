
#React-Native, Redux
```react
const reducer = () => [];
const store = Redux.createStore(reducer);

store.getState(); // []

const action = {
  type: 'split_string',
  payload: 'asdf'
};

store.dispatch(action);
store.getState(); // [{"type": "split_string", "payload": "asdf"}, ["a", "s", "d", "f"]]
```
* __Action__: An object that tells the reducer how to change its data.
* __Reducer__: A function that returns some data.
* __State__: Data for our app to use.
* __Store__: An object that holds the application's data.

### Why Reducer, Action Creator, Store?
Excellent for scaling app with least amount of complexity.
Because of action system, action provide predictable changes to the state of app. 
By restrict the way we can modify the state, app can be more managable.

### ```Provider```
```Provider``` works with ```store```. ```store``` holds every state for our app. Purpose of ```Provider``` is translate ```store```'s state into data what React Component can use.

### Theory of ```ListView```
Should be designed for efficient memory usage.
```ListView``` is Component which is worked by configuring what item list is visible to user in given time. And only the Components are created which are shown to user with the list data.
The ```ListView``` watches user's scroll event so that it can configure which list is out of sight and vise versa. Just swap data and left its Component.

### Action types
Define type name by when that action is executed.
So do not use action type name such as ```SPINNER_START```. ```SPINNER_START```, we can not make sure when that action is dispatched. Instead use ```USER_LOGIN```, with that name every changes happen when user is logined. This can imply that spinner also created.

### Overrider Style
```react
<View style={[styles.containerStyle, props.style]}>
	{props.children}
</View>
```
Component style property can take an array. Use ```styles.containerStyle```, but if there's same property in ```props.style```, override.
In general, the style most to the right will be overrided with the style on the left.

### Return with fat-arrow-function
```react
...
return () => {
  firebase.database().ref('/')
  ...
};
```
Although we do not use action fetched, to pass the redux-thunk middleware, should use fat-arrow-function.

### Use life-cycle method
```react
componentWillMount() {
	this.props.employeesFetch();

	this.createDataSource(this.props);
}

componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
}
...
createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
}
```
No matter when new datas are fetched or return to this Component again, create up to data ```dataSource```

# React-Native, Firebase
​```react
// actions.js
export function loginUser({ email, password }) {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => dispatch({ type: LOGIN_SUCCESS, payload: user }))
      .catch(() => { ... }) // catches error!
    }
}
```
​``` react
// reducers.js
switch(action.type) {
  case LOGIN_SUCCESS:
  	STRANGE_CODE; // throw error!
  	return state;
}
```
## Change the rules for security
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```
There is ```"users"``` collection. And that collection will have ```$uid```(user id) keys. And only authenticated user can read, write that matching user. Accessing other uid bucket will be denied.

#React-Native, Reusability
There's controversial whether reuse form to create and edit.
In other words, use same ```EmployeeFrom``` in form to create employee and form to display edit employee.
* Editing
  When editing, have to prepopulate state in form reducer.
  User edits form - then do not change employee model!

Although there're lot of similarity, there still lot of different logic. So it going to be mass if create/edit put together in one Component.
So make ```EmployeeCreate```, ```EmployeeEdit```, ```EmployeeForm``` Component. ```EmployeeForm``` component is reusable Component for ```EmployeeCreate```, ```EmployeeEdit```. With this component we can handle similar login in create/edit form.
