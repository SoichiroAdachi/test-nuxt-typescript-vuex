import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ref, Ref } from '@nuxtjs/composition-api'

@Module({ name: 'ShowAddFormStore', namespaced: true, stateFactory: true })
export default class ShowAddFormStore extends VuexModule {
  private _isShowAddFormRef = ref<boolean>(false)

  get isShowAddFormRef(): Ref<boolean> {
    return this._isShowAddFormRef
  }

  @Mutation
  private _toggle(): void {
    this._isShowAddFormRef.value = !this._isShowAddFormRef.value
  }

  @Action
  toggle(): void {
    this._toggle()
  }
}
