/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import TaskStore from '~/store/TaskStore'
import ShowAddFormStore from '~/store/ShowAddFormStore'

// 作成したモジュールはここに追加
let taskStore: TaskStore
let showAddFormStore: ShowAddFormStore

function initialiseStores(store: Store<any>): void {
  taskStore = getModule(TaskStore, store)
  showAddFormStore = getModule(ShowAddFormStore, store)
}

export { initialiseStores, taskStore, showAddFormStore }
