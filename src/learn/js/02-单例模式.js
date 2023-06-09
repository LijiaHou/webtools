/**
 * 简单版
 * 每次通过Singleton.getInstance()获取实例
 * */ 
// let Singleton = function(name) {
//     this.name = name;
//     this.instance = null;
// }

// Singleton.prototype.getName = function() {
//     return this.name;
// }

// Singleton.getInstance = function(name) {
//     if (this.instance) {
//         return this.instance;
//     } else {
//         return this.instance = new Singleton(name);
//     }
// }

// 测试
// let Winner = Singleton.getInstance('Winner');
// let Loser = Singleton.getInstance('Loser');

// console.log(Winner === Loser);
// console.log(Winner.getName());
// console.log(Loser.getName());



/**
 * 利用闭包，使用new来创建实例
 * */ 
let CreateSingleton = (function(){ // 一个匿名自执行函数（注意：只自执行了一次）
    let instance;
    return function(name) { // 这个方法会被赋给CreateSingleton，并且与instance形成闭包
        if (instance) {
            return instance;
        }
        this.name = name;
        return instance = this;
    }
})();
CreateSingleton.prototype.getName = function() {
    return this.name
}



// 测试
let Winner = new CreateSingleton('Winner');
let Loser = new CreateSingleton('Loser');

console.log(Winner === Loser);
console.log(Winner.getName());
console.log(Loser.getName());
