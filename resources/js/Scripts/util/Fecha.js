import moment from 'moment';

const state = {
    start_date: moment(new Date()).local().format('YYYY-MM-DDTHH:mm'),
    end_date: moment().add(30, 'days').local().format('YYYY-MM-DDTHH:mm'),
};

const mutations = {
    SET_START_DATE: (state, value) => {
        state.start_date = value;
    },
    SET_END_DATE: (state, value) => {
        state.end_date = value;
    },
};

const getters = {
    differenceDate (state) {
        const start = moment(state.start_date);
        const end = moment(state.end_date);
        return end.diff(start, 'days');
    }
};

export default {
    state,
    mutations,
    getters
}