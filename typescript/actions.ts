// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

interface State {
  number: number;
}

/* [start] suggestion to reduce boilerplate */
// actions.ts
export enum ActionTypes {
    Increment = 'INCREMENT',
    OpenModal = 'OPEN_MODAL'
}

function openModalAction():OpenModalAction {
  return {
    type: ActionTypes.OpenModal
  }
}

const r = openModalAction();

interface OpenModalAction {
  type: ActionTypes.OpenModal;
}

const openModalAction_ = ():OpenModalAction => ({type: ActionTypes.OpenModal});

interface FnwithoutPayload<T> {
  (): {type: T}
}

interface FnwithPayload<T, U> {
  (payload: U): {type: T, payload: U}
}

interface withoutPayload<T>{
  type: T;
}

interface withPayload<T,U>{
  type: T;
  payload: U;
}

function actionCreatorFactory<T>(type: T): FnwithoutPayload<T>
function actionCreatorFactory<T, U>(type: T, payload: U): FnwithPayload<T, U>
function actionCreatorFactory<T, U>(type: T, payload?: U): FnwithoutPayload<T> | FnwithPayload<T, U> {
  if (typeof payload !== 'undefined') {
    return (payload: U): {type:T, payload: U} => ({type, payload});
  } else {
    return (): {type: T} => ({type});
  }
}

const open = actionCreatorFactory<ActionTypes.OpenModal>(ActionTypes.OpenModal);
const increment = actionCreatorFactory<ActionTypes.Increment, number>(ActionTypes.Increment, 1);
type GetReturnedType<T> = T extends ((...args: any[]) => infer R) ? R : T;

type openAction = GetReturnedType<typeof open>;
type incrementAction = GetReturnedType<typeof increment>;

const openAction = open();
const openType = typeof open();

let a: withoutPayload<ActionTypes.OpenModal>;



// function actionCreatorFactoryWithoutPayload<T>(type: T):() => {type: T} {
//   return ():{type: T} => ({type});
// }

// function actionCreatorFactoryWithPayload<T, U>(
//   type: T,
//   payload: U
// ): (payload: U) => {type: T, payload: U} {
//   return (payload: U): {type:T, payload: U} => ({type, payload});
// }



interface IncrementAction {
  type: ActionTypes.Increment;
  payload: number
}

function incrementAction(payload: number): IncrementAction {
  return {
    type: ActionTypes.Increment,
    payload
  }
}

type SomeActions = OpenModalAction | IncrementAction;

// reducer.ts
export function someReducer(
  state: State,
  action: SomeActions
): State {
    switch (action.type) {
      case ActionTypes.OpenModal: {
        return state;
      }
      case ActionTypes.Increment: {
        return {
          ...state,
          number: state.number + action.payload
        }
      }
    }
}
/* [end] suggestion to reduce boilerplate */