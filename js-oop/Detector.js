//通过即时执行封装成一个模块
!function(global) {
  
  //---start DetectorBase---
  //定义探测器基类
  function DetectorBase(configs) {
    //如果对象不是new出来的，则this对象不等于本身，抛异常
    //使类new出来使用
    if(!this instanceof DetectorBase) {
      throw new Error('Do not invoke without new.');
    }
    
    //定义配置属性和方法
    this.configs = configs;
    this.analyze();
  }
  
  //一般的实现是 1、构造实现类 2、继承基类 3、实现实现类方法
  
  //1、构造实现类
  //定义基类方法
  DetectorBase.prototype.detect = function() {
    throw new Error('Not implemented');
  };
  
  DetectorBase.prototype.analyze = function() {
    console.log('DetectorBase analyze');
    this.data = '###data###';
  };
  //---end DetectorBase---
  
  //---start LinkDetector ContainerDetector---
  //定义链接型实现类
  function LinkDetector(links) {
    if(!this instanceof LinkDetector) {
      throw new Error('Do not invoke without new.');
    }
    
    this.links = links;
    //调用基类实现方法，将自身和参数传递过去，模拟继承
    DetectorBase.apply(this, arguments);
  }
  
  //定义内容性实现类
  function ContainerDetector(containers) {
    if(!this instanceof ContainerDetector) {
      throw new Error('Do not invoke without new.');
    }
    
    this.containers = containers;
    //调用基类实现方法，将自身和参数传递过去，模拟继承
    DetectorBase.apply(this, arguments);
  }
  //---end LinkDetector ContainerDetector---
  
  //2、继承基类
  //这里主要是将对象原型指向基类的原型，作为继承
  inherit(LinkDetector, DetectorBase);
  inherit(ContainerDetector, DetectorBase);
  
  function inherit(subClass, superClass) {
    //将子类的原型指向父类的原型，这里用Object.create是创建新的对象，避免覆盖父类原型
    subClass.prototype = Object.create(superClass.prototype);
    //将子类的构造函数指向对象原型
    subClass.prototype.constructor = subClass;
  }
  
  //3、实现实现类方法
  //实现基类方法和自定义方法，这里要放在继承后进行
  LinkDetector.prototype.detect = function() {
    console.log('Loading LinkDetector data: ' + this.data);
    console.log('Link detection started.');
    console.log('Scaning links: ' + this.links);
  };
  
  ContainerDetector.prototype.detect = function() {
    console.log('Loading ContainerDetector data: ' + this.data);
    console.log('Container detection started.');
    console.log('Scaning containers: ' + this.containers);
  };
  
  //冻结对象，是对象属性不可改变
  Object.freeze(DetectorBase);
  Object.freeze(DetectorBase.prototype);
  Object.freeze(LinkDetector);
  Object.freeze(LinkDetector.prototype);
  Object.freeze(ContainerDetector);
  Object.freeze(ContainerDetector.prototype);
  
  //固定全局变量的属性为当前对象
  Object.defineProperties(global, {
    LinkDetector: {value: LinkDetector},
    ContainerDetector: {value: ContainerDetector},
    DetectorBase: {value: DetectorBase}
  });
  
}(this);

var containerDetector = new this.ContainerDetector('#abc #def #ghi');
var linkDetector = new this.LinkDetector('http://supherat.com');

containerDetector.detect();
linkDetector.detect();