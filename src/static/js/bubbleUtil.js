/* eslint-disable */
;(function (factory) {
	if (typeof define === 'function' && define.amd) {
	    define(['echarts'], factory);
	} else {
	    factory(echarts);
	}
}(function (echarts) {
		
	function count(node) {
	  var sum = 0,
		  children = node.children,
		  i = children && children.length;
	  if (!i) sum = 1;
	  else while (--i >= 0) sum += children[i].value;
	  node.value = sum;
	}

	var node_count = function() {
	  return this.eachAfter(count);
	};

	var node_each = function(callback) {
	  var node = this, current, next = [node], children, i, n;
	  do {
		current = next.reverse(), next = [];
		while (node = current.pop()) {
		  callback(node), children = node.children;
		  if (children) for (i = 0, n = children.length; i < n; ++i) {
			next.push(children[i]);
		  }
		}
	  } while (next.length);
	  return this;
	};

	var node_eachBefore = function(callback) {
	  var node = this, nodes = [node], children, i;
	  while (node = nodes.pop()) {
		callback(node), children = node.children;
		if (children) for (i = children.length - 1; i >= 0; --i) {
		  nodes.push(children[i]);
		}
	  }
	  return this;
	};

	var node_eachAfter = function(callback) {
	  var node = this, nodes = [node], next = [], children, i, n;
	  while (node = nodes.pop()) {
		next.push(node), children = node.children;
		if (children) for (i = 0, n = children.length; i < n; ++i) {
		  nodes.push(children[i]);
		}
	  }
	  while (node = next.pop()) {
		callback(node);
	  }
	  return this;
	};

	var node_sum = function(value) {
	  return this.eachAfter(function(node) {
		var sum = +value(node.data) || 0,
			children = node.children,
			i = children && children.length;
		while (--i >= 0) sum += children[i].value;
		node.value = sum;
	  });
	};

	var node_sort = function(compare) {
	  return this.eachBefore(function(node) {
		if (node.children) {
		  node.children.sort(compare);
		}
	  });
	};

	var node_path = function(end) {
	  var start = this,
		  ancestor = leastCommonAncestor(start, end),
		  nodes = [start];
	  while (start !== ancestor) {
		start = start.parent;
		nodes.push(start);
	  }
	  var k = nodes.length;
	  while (end !== ancestor) {
		nodes.splice(k, 0, end);
		end = end.parent;
	  }
	  return nodes;
	};

	function leastCommonAncestor(a, b) {
	  if (a === b) return a;
	  var aNodes = a.ancestors(),
		  bNodes = b.ancestors(),
		  c = null;
	  a = aNodes.pop();
	  b = bNodes.pop();
	  while (a === b) {
		c = a;
		a = aNodes.pop();
		b = bNodes.pop();
	  }
	  return c;
	}

	var node_ancestors = function() {
	  var node = this, nodes = [node];
	  while (node = node.parent) {
		nodes.push(node);
	  }
	  return nodes;
	};

	var node_descendants = function() {
	  var nodes = [];
	  this.each(function(node) {
		nodes.push(node);
	  });
	  return nodes;
	};

	var node_leaves = function() {
	  var leaves = [];
	  this.eachBefore(function(node) {
		if (!node.children) {
		  leaves.push(node);
		}
	  });
	  return leaves;
	};

	var node_links = function() {
	  var root = this, links = [];
	  root.each(function(node) {
		if (node !== root) { // Don’t include the root’s parent, if any.
		  links.push({source: node.parent, target: node});
		}
	  });
	  return links;
	};

	function hierarchy(data, children) {
	  var root = new Node(data),
		  valued = +data.value && (root.value = data.value),
		  node,
		  nodes = [root],
		  child,
		  childs,
		  i,
		  n;

	  if (children == null) children = defaultChildren;

	  while (node = nodes.pop()) {
		if (valued) node.value = +node.data.value;
		if ((childs = children(node.data)) && (n = childs.length)) {
		  node.children = new Array(n);
		  for (i = n - 1; i >= 0; --i) {
			nodes.push(child = node.children[i] = new Node(childs[i]));
			child.parent = node;
			child.depth = node.depth + 1;
		  }
		}
	  }

	  return root.eachBefore(computeHeight);
	}

	function node_copy() {
	  return hierarchy(this).eachBefore(copyData);
	}

	function defaultChildren(d) {
	  return d.children;
	}

	function copyData(node) {
	  node.data = node.data.data;
	}

	function computeHeight(node) {
	  var height = 0;
	  do node.height = height;
	  while ((node = node.parent) && (node.height < ++height));
	}

	function Node(data) {
	  this.data = data;
	  this.depth =
	  this.height = 0;
	  this.parent = null;
	}

	Node.prototype = hierarchy.prototype = {
	  constructor: Node,
	  count: node_count,
	  each: node_each,
	  eachAfter: node_eachAfter,
	  eachBefore: node_eachBefore,
	  sum: node_sum,
	  sort: node_sort,
	  path: node_path,
	  ancestors: node_ancestors,
	  descendants: node_descendants,
	  leaves: node_leaves,
	  links: node_links,
	  copy: node_copy
	};

    function Node$1(circle) {
	  this._ = circle;
	  this.next = null;
	  this.previous = null;
	}

	function packEnclose(circles) {
	  if (!(n = circles.length)) return 0;

	  var a, b, c, n, aa, ca, i, j, k, sj, sk;

	  // Place the first circle.
	  a = circles[0], a.x = 0, a.y = 0;
	  if (!(n > 1)) return a.r;

	  // Place the second circle.
	  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
	  if (!(n > 2)) return a.r + b.r;

	  // Place the third circle.
	  place(b, a, c = circles[2]);

	  // Initialize the front-chain using the first three circles a, b and c.
	  a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
	  a.next = c.previous = b;
	  b.next = a.previous = c;
	  c.next = b.previous = a;

	  // Attempt to place each remaining circle…
	  pack: for (i = 3; i < n; ++i) {
		place(a._, b._, c = circles[i]), c = new Node$1(c);

		// Find the closest intersecting circle on the front-chain, if any.
		// “Closeness” is determined by linear distance along the front-chain.
		// “Ahead” or “behind” is likewise determined by linear distance.
		j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
		do {
		  if (sj <= sk) {
			if (intersects(j._, c._)) {
			  b = j, a.next = b, b.previous = a, --i;
			  continue pack;
			}
			sj += j._.r, j = j.next;
		  } else {
			if (intersects(k._, c._)) {
			  a = k, a.next = b, b.previous = a, --i;
			  continue pack;
			}
			sk += k._.r, k = k.previous;
		  }
		} while (j !== k.next);

		// Success! Insert the new circle c between a and b.
		c.previous = a, c.next = b, a.next = b.previous = b = c;

		// Compute the new closest circle pair to the centroid.
		aa = score(a);
		while ((c = c.next) !== b) {
		  if ((ca = score(c)) < aa) {
			a = c, aa = ca;
		  }
		}
		b = a.next;
	  }

	  // Compute the enclosing circle of the front chain.
	  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = enclose(a);

	  // Translate the circles to put the enclosing circle around the origin.
	  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

	  return c.r;
	}

	var siblings = function(circles) {
	  packEnclose(circles);
	  return circles;
	};

	function optional(f) {
	  return f == null ? null : required(f);
	}

	function required(f) {
	  if (typeof f !== "function") throw new Error;
	  return f;
	}

	function constantZero() {
	  return 0;
	}

	var constant$8 = function(x) {
	  return function() {
		return x;
	  };
	};

	function defaultRadius$1(d) {
	  return Math.sqrt(d.value);
	}

	function setPack() {
	  var radius = null,
		  dx = 1,
		  dy = 1,
		  padding = constantZero;

	  function pack(root) {
		root.x = dx / 2, root.y = dy / 2;
		if (radius) {
		  root.eachBefore(radiusLeaf(radius))
			  .eachAfter(packChildren(padding, 0.5))
			  .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
			 // .eachBefore(translateChild(1));
		} else {
		  root.eachBefore(radiusLeaf(defaultRadius$1))
			  .eachAfter(packChildren(constantZero, 1))
			  .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
			  .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
		}
		return root;
	  }

	  pack.radius = function(x) {
		return arguments.length ? (radius = optional(x), pack) : radius;
	  };

	  pack.size = function(x) {
		return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
	  };

	  pack.padding = function(x) {
		return arguments.length ? (padding = typeof x === "function" ? x : constant$8(+x), pack) : padding;
	  };

	  return pack;
	};

	function radiusLeaf(radius) {
	  return function(node) {
		if (!node.children) {
		  node.r = Math.max(0, +radius(node) || 0);
		}
	  };
	}

	function packChildren(padding, k) {
	  return function(node) {
		if (children = node.children) {
		  var children,
			  i,
			  n = children.length,
			  r = padding(node) * k || 0,
			  e;

		  if (r) for (i = 0; i < n; ++i) children[i].r += r;
		  e = packEnclose(children);
		  if (r) for (i = 0; i < n; ++i) children[i].r -= r;
		  node.r = e + r;
		}
	  };
	}

	function translateChild(k) {
	  return function(node) {
		var parent = node.parent;
		node.r *= k;
		if (parent) {
		  node.x = parent.x + k * node.x;
		  node.y = parent.y + k * node.y;
		}
	  };
	}
	
	function place(a, b, c) {
	  var ax = a.x,
		  ay = a.y,
		  da = b.r + c.r,
		  db = a.r + c.r,
		  dx = b.x - ax,
		  dy = b.y - ay,
		  dc = dx * dx + dy * dy;
	  if (dc) {
		var x = 0.5 + ((db *= db) - (da *= da)) / (2 * dc),
			y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
		c.x = ax + x * dx + y * dy;
		c.y = ay + x * dy - y * dx;
	  } else {
		c.x = ax + db;
		c.y = ay;
	  }
	}
	
	function intersects(a, b) {
	  var dx = b.x - a.x,
		  dy = b.y - a.y,
		  dr = a.r + b.r;
	  return dr * dr - 1e-6 > dx * dx + dy * dy;
	}

	function score(node) {
	  var a = node._,
		  b = node.next._,
		  ab = a.r + b.r,
		  dx = (a.x * b.r + b.x * a.r) / ab,
		  dy = (a.y * b.r + b.y * a.r) / ab;
	  return dx * dx + dy * dy;
	}
	var enclose = function(circles) {
	  var i = 0, n = (circles = shuffle$1(slice$3.call(circles))).length, B = [], p, e;

	  while (i < n) {
		p = circles[i];
		if (e && enclosesWeak(e, p)) ++i;
		else e = encloseBasis(B = extendBasis(B, p)), i = 0;
	  }

	  return e;
	};

	function extendBasis(B, p) {
	  var i, j;

	  if (enclosesWeakAll(p, B)) return [p];

	  // If we get here then B must have at least one element.
	  for (i = 0; i < B.length; ++i) {
		if (enclosesNot(p, B[i])
			&& enclosesWeakAll(encloseBasis2(B[i], p), B)) {
		  return [B[i], p];
		}
	  }

	  // If we get here then B must have at least two elements.
	  for (i = 0; i < B.length - 1; ++i) {
		for (j = i + 1; j < B.length; ++j) {
		  if (enclosesNot(encloseBasis2(B[i], B[j]), p)
			  && enclosesNot(encloseBasis2(B[i], p), B[j])
			  && enclosesNot(encloseBasis2(B[j], p), B[i])
			  && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
			return [B[i], B[j], p];
		  }
		}
	  }

	  // If we get here then something is very wrong.
	  throw new Error;
	}

	function enclosesNot(a, b) {
	  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
	  return dr < 0 || dr * dr < dx * dx + dy * dy;
	}

	function enclosesWeak(a, b) {
	  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
	  return dr > 0 && dr * dr > dx * dx + dy * dy;
	}

	function enclosesWeakAll(a, B) {
	  for (var i = 0; i < B.length; ++i) {
		if (!enclosesWeak(a, B[i])) {
		  return false;
		}
	  }
	  return true;
	}

	function encloseBasis(B) {
	  switch (B.length) {
		case 1: return encloseBasis1(B[0]);
		case 2: return encloseBasis2(B[0], B[1]);
		case 3: return encloseBasis3(B[0], B[1], B[2]);
	  }
	}

	function encloseBasis1(a) {
	  return {
		x: a.x,
		y: a.y,
		r: a.r
	  };
	}
    
	function encloseBasis2(a, b) {
	  var x1 = a.x, y1 = a.y, r1 = a.r,
		  x2 = b.x, y2 = b.y, r2 = b.r,
		  x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
		  l = Math.sqrt(x21 * x21 + y21 * y21);
	  return {
		x: (x1 + x2 + x21 / l * r21) / 2,
		y: (y1 + y2 + y21 / l * r21) / 2,
		r: (l + r1 + r2) / 2
	  };
	}

	function encloseBasis3(a, b, c) {
	  var x1 = a.x, y1 = a.y, r1 = a.r,
		  x2 = b.x, y2 = b.y, r2 = b.r,
		  x3 = c.x, y3 = c.y, r3 = c.r,
		  a2 = x1 - x2,
		  a3 = x1 - x3,
		  b2 = y1 - y2,
		  b3 = y1 - y3,
		  c2 = r2 - r1,
		  c3 = r3 - r1,
		  d1 = x1 * x1 + y1 * y1 - r1 * r1,
		  d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
		  d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
		  ab = a3 * b2 - a2 * b3,
		  xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
		  xb = (b3 * c2 - b2 * c3) / ab,
		  ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
		  yb = (a2 * c3 - a3 * c2) / ab,
		  A = xb * xb + yb * yb - 1,
		  B = 2 * (r1 + xa * xb + ya * yb),
		  C = xa * xa + ya * ya - r1 * r1,
		  r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
	  return {
		x: x1 + xa + xb * r,
		y: y1 + ya + yb * r,
		r: r
	  };
	}

    var slice$3 = Array.prototype.slice;

	function shuffle$1(array) {
	  var m = array.length,
		  t,
		  i;

	  while (m) {
		i = Math.random() * m-- | 0;
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	  }

	  return array;
	}
    echarts.util.hierarchy = hierarchy;
	echarts.util.pack = setPack;

	/**
	   绘制气泡图，data为气泡显示数据
	*/
	function renderBubbleChart(data, container, cb) {
					
		var chart = echarts.init(container);
											   
		drawChart(chart, processBubbleData(data, container)); 
		
		bindChartEvent(chart, cb);
	}
	
	/**
	   * 获取气泡图的根气泡和各气泡的属性:颜色、坐标位置(x,y)、半径(r)
	   * @param {Function} 	data: 初始化数据
	   * @param {Function} 	pack: 布局函数
	   * @return {Array} 气泡信息集合			   
	*/
	function processBubbleData(data, container) {
		var width = container.style.width.replace('px', '');
		var height = container.style.height.replace('px', '');
		//初始化气泡图显示的布局(主要是宽度和高度)	
		var pack = echarts.util.pack()
		.size([width, height])
		.padding(1);
		
		var index = 0;				
		var color = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", 			
		"#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];	
		
		var root = echarts.util.hierarchy({children: data})
				   .sum(function(d) { return d.value; })
				   .each(function(d){
					   d.color = color[index % 20];
					   index++;
					   return d.color;
				   });
				   
		return pack(root).leaves(); 
	}
	/**
	   * 绘制Echarts图表
	   * @param {Object} container: dom实例
	*/
	function drawChart(chart, bubbleData) {			    											
		var option = {
			 tooltip: {
				show: true,
				triggerOn: 'none',
				formatter: function (params) {
					return '<span  style="border-radius: 6px;width: 12px;height: 12px;display: inline-block;background-color:' + params.color +'"></span>' + ' ' +  params.data.name + ':  ' + params.data.value;
				}
			},
			graphic: getCircleOption(bubbleData, chart),
			series: []
		};			
		chart.setOption(option);
	}
	
	/**
	   * 获取气泡的graphic配置项
	   * @param {Array} processData: 气泡的属性信息集合
	   * @param {Object} chart: echarts实例
	   * @return {Array}  配置项集合
	*/			
	function getCircleOption(processData, chart) {
		 return echarts.util.map(processData, function (item, dataIndex) {
			return {
				type: 'group',
				id: 'circleGroup' + dataIndex,
				bounding: 'raw',
				color: item.color,
				data: item.data,	
				children: getChildOption(item, dataIndex, chart),							
				onmousemove: function (event) {
					showTooltip.call(this, event, chart);	                         						
				},
				onmouseout: function (event) {						 
					hideTooltip.call(this, event, chart);
				}
			};
		});								
	}
	/**
	   * 设置气泡和文本节点配置信息
	   * @param {Object} item: 气泡的属性信息
	   * @dataIndex {Number} dataIndex: 气泡的序号
	   * @param {Object} chart: echarts实例
	   * @return {Array} children： 配置项集合
	*/
	function getChildOption(item, dataIndex, chart) {
		var children = [];
		children.push({
			id: 'circle' + dataIndex,
			type: 'circle',
			shape: {
				cx: item.x,
				cy: item.y,
				r: item.r 
			},
			name: 'mainElem',
			style: {
				fill: item.color
			},
			eventData: {
				id: 'circle' + dataIndex
			},
			onclick: bindClickEvent			
		});
		children.push({					  
			type: 'text',					
			style: {
				fill: '#fff',
				text: item.data.name,
				x: item.x - item.r / 4,
				y: item.y
			},
			value: item.value
		});
		return children;
		/**
		   * 气泡绑定click事件
		*/
		function bindClickEvent() {
			var circle = new echarts.graphic.Circle({
			   shape: this.shape,
			   style: {
				   stroke: 'green',
				   fill: null,
				   lineWidth: 2 	
			   }
			});
			this.parent.add(circle);
			chart.addClickElem(circle);
		}
	}
	//显示气泡的具体显示
	function showTooltip(event, chart) {
		chart.dispatchAction({
			type: 'showTip',
			// 屏幕上的 x 坐标
			x: event.offsetX,					
			// 屏幕上的 y 坐标
			y: event.offsetY,
			tooltip: {
				formatterParams: {
					color: this.color,
					data: this.data
				}					    
			}					
		}); 
		//显示气泡的边界条纹				
		this.childOfName('mainElem').setStyle({
			 stroke: 'green',
			 lineWidth: 2 								 
		});					
	}
	//隐藏气泡的具体显示
	function hideTooltip(event, chart) {
		chart.dispatchAction({
			type: 'hideTip'
		});				
		this.childOfName('mainElem').setStyle({
			 stroke: null						 
		});
	}
	
	/**
	  * 图表添加事件处理函数
	  * @param {Object} chart: echarts实例
	*/
	function bindChartEvent(chart, cb) {
		//点击气泡后的回调
		chart.addClickElem = function (elem) {
			if (this.currentElem !== elem && this.currentElem != null) {
				this.currentElem.parent.remove(this.currentElem);			
			}
			this.currentElem = elem;
		};	
		chart.off('click')
		chart.on('click', function(params) {
			if(cb) cb(params)
		})
		
		//点击canvas中非气泡部分				
		chart._zr.on('click', function (params) {
			if(params.target == null) {
				if (chart.currentElem != null) {
					chart.currentElem.parent.remove(chart.currentElem);	
					chart.currentElem = null;						
				}
			}
		});
		
		//点击页面中非canvas部分
		document.onclick = function (event) {
			if (event.toElement.tagName != 'CANVAS') {
				if (chart.currentElem != null) {
					chart.currentElem.parent.remove(chart.currentElem);	
					chart.currentElem = null;						
				}
			}
		};
	}
	
	window.renderBubbleChart = renderBubbleChart;
	
	return renderBubbleChart;	
}));

