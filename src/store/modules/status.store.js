const state = {
    areaNodeData: [],//地区列表数据,
    areaTree:[]
}

const mutations = {
    setAreaData(state, payload) {
        state.areaNodeData = payload.data;
    },
    pushAreaRootData(state, payload) {
        state.areaNodeData.push(payload.data);
    },
    setAreaTree(state,payload){
        state.areaTree=payload.data;
    }
}

const actions = {
    getAreaNodes({ commit }, areaId) {
        areaId = areaId ? areaId : 'root';
        return httpAjax('get', '/sys/areas/' + areaId + '/children').then((re) => {
            if (areaId == 'root') {
                commit({
                    type: 'setAreaData',
                    data: re.list
                })
            }
            return re;
        });
    },
    addAreaNode({ commit }, { data, isRoot }) {
        return httpAjax('post', '/sys/areas', data).then((re) => {
            if (isRoot) {
                commit({
                    type: 'pushAreaRootData',
                    data: re.area
                })
            }
            return re;
        });
    },
    updateAreaNode({ commit }, { id, data }) {
        return httpAjax('put', '/sys/areas/' + id, data);
    },
    deleteAreaNode({ commit }, ids) {
        return httpAjax('delete','/sys/areas/batch/delete',{data:{ids}})
    },
    //？？？
    getAreaTree({commit}){
        return httpAjax('get','/sys/areas/tree').then((re)=>{
            commit({
                type:'setAreaTree',
                data:re.tree
            })
            return re;
        });
    },
    //add by chugz 2017-12-5
    //获取带经纬度的地区
    getTreeWithLatitudeLongitude({commit}) {
        return httpAjax('get','/sys/areas/getTreeWithLatitudeLongitude')
    },
}

export default {
    name: 'areaPer',
    module: {
        state, mutations, actions
    }
}