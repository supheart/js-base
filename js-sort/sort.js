// 快速排序是由东尼·霍尔所发展的一种排序算法。在平均状况下，排序 n 个项目要Ο(n log n)次比较。在最坏状况下则需要Ο(n^2)次比较，但这种状况并不常见。事实上，快速排序通常明显比其他Ο(n log n) 算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。快速排序使用分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）。

// 快速排序的思想很简单，排序过程只需要三步：

// 1. 从数列中挑出一个元素，称为 “基准”（pivot）
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
// 递归的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递归下去，但是这个算法总会退出，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。

//实现快速排序
exports.quickSort = function(arr, dir) {
  var _this = this;

  //确定排序的顺序
  dir = dir || 'asc';
  if(arr.length == 0) return [];

  //确定左边列表和右边列表，取第一个数为中间分隔
  var left = new Array();
  var right = new Array();
  var pivot = arr[0];

  if(dir === 'asc') {
    //遍历数组，如果升序，就将小于分隔数放在左边，大于分隔数放在右边
    for(var i = 1; i < arr.length; i++) {
      arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }
  }else {
    //遍历数组，如果降序，就将小于分隔数放在右边，大于分隔数放在左边
    for(var i = 1; i < arr.length; i++) {
      arr[i] > pivot ? left.push(arr[i]) : right.push(arr[i]);
    }
  }

  //递归调用方法，直至数组长度为0则返回，将有序数组组合
  return _this.sort(left, dir).concat(pivot, _this.sort(right, dir));
}


var L = require('./lib/linklist');
exports.sort = function(arr, count) {
  //初始化参数，如果都为0，则返回空
  if(arr.length == 0) return [];
  count = count || (count > 1 ? count : 10);

  //便利数组，找出最大值和最小值,
  var min = arr[0], max = arr[0]; 
  for(var i = 1; i < arr.length; i++){
    min = min < arr[i] ? min : arr[i];
    max = max > arr[i] ? max : arr[i];
  }

  //设置桶的范围
  var delta = (max - min + 1) / count;

  //初始化桶
  var buckets = [];

  //存储数据到桶
  for(var i = 0; i < arr.length; i++){
    //确定桶的大小
    var idx = Math.floor((arr[i] - min) / delta); 

    //如果不是空桶，则遍历后插入
    if(buckets[i]) {
      var bucket = buckets[idx];
      var insert = false; //插入标识
      L.reTraversal(bucket, function(item, done) {
        if(arr[i] <= item.v) {
          L.append(item, _val(arr[i]));
          insert = true;
          //退出遍历
          done();
        }
      });
      if(!insert) {
        L.append(bucket, _val(arr[i]));
      }
    }else { //空桶，直接插入
      var bucket = L.init();
      if(arr[i] == 55){
        console.log('aa');
      }
      L.append(bucket, _val(arr[i]));
      buckets[idx] = bucket; //链表实现
    }
  }

  var result = [];

  //遍历桶的内容，然后组合
  for (var i = 0, j = 0; i < count; i++) {
    L.reTraversal(buckets[i], function (item) {
      result[j++] = item.v;
    });
  }
  return result;
}

//链表存储对象
function _val(v) {
  return {v: v};
}

