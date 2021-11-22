/**
 * @author 王业鹏
 * @description 根据树状结构菜单自动引入.vue文件
 * @date 2020/03/16 21:44
 * @class TraverseTree
 * @constructor menu
 * @constructor layout
 * @return layout
 * */

export class TraverseTree {
  constructor(menu, layout) {
    this.menu = menu; // 菜单
    this.layout = layout; // 路由集合
    this.list = []; // 搜索集合
    this.run()
  }

  hasChildren(value) {
    if (!value || value.length === 0) return false;
    return value.some(item => !item.hidden)
  }

  release() { // 释放内存
    this.menu = null;
  }

  operate(item) {
    // 搜索菜单
    this.list.push({
      indexPath: item.indexPath,
      index: item.title,
      cache: item.cache,
      name: item.name,
      path: item.path,
      iframe: item.iframe
    })
    // 路由
    if (item.iframe) return;
    let obj = {};
    obj.name = item.name;
    obj.path = item.path;
    obj.meta = {};
    obj.meta.title = item.title;
    obj.component = () => import(`@/views${item.path}`);
    this.layout.children.push(obj)
  }

  run() {
    // 遍及一级
    this.menu.forEach(fistItem => {
      fistItem.path = `/${fistItem.name}`;
      fistItem.indexPath = [fistItem.title];
      if (this.hasChildren(fistItem.children)) {
        // 遍历二级
        fistItem.children.forEach(secondItem => {
          secondItem.path = `/${fistItem.name}/${secondItem.name}`;
          secondItem.indexPath = [fistItem.title, secondItem.title];
          if (this.hasChildren(secondItem.children)) {
            // 遍历三级
            secondItem.children.forEach(thirdItem => {
              thirdItem.path = `/${fistItem.name}/${secondItem.name}/${thirdItem.name}`;
              thirdItem.indexPath = [fistItem.title, secondItem.title, thirdItem.title];
              this.operate(thirdItem) // 添加三级
            })
          } else {
            this.operate(secondItem) // 添加二级
          }
        })
      } else {
        this.operate(fistItem) // 添加一级
      }
    })
    this.release();
  }

  getLayout() {
    return this.layout;
  }

  getList() {
    return this.list;
  }
}
