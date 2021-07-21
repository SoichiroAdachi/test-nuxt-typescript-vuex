// このファイルは一度作成したら基本、編集しない
import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'

// ストアの初期化
const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]
export * from '~/utils/store-accessor'
