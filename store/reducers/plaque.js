import {CREATE_PLAQUE, SET_PLAQUE} from "../actions/plaque";
import Plaque from "../../models/plaque";

const initialState = {
    plaques: [],
    plaqueArray: [],
    phoneArray: [],
    timeArray: []
}

const plaqueReducer = (state = initialState, action) => {
    switch (action.type) {
          case CREATE_PLAQUE :
            const newPlaque = new Plaque (
                action.plaqueData.num,
                action.plaqueData.phone,
                action.plaqueData.time,
                action.plaqueData.pushToken
            );
            return {
                ...state,
                plaques: state.plaques.concat(newPlaque)
            }
        case SET_PLAQUE :
            return {
                ...state,
                plaqueArray: action.plaquess,
        };
    }
    return state;
}

export default plaqueReducer;