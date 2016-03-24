export interface Store {
    env: {
        modules:any
    }
}

export const initialState:Store = {
    env: {
        modules: ModuleLoader.moduleData
    }
};