webpackJsonp([6],{LmW0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),n=a("SJI6"),o=a("5jRo"),l=a("L6bb"),c=a.n(l),r={name:"stationManger",mixins:[o.a],data:function(){return{apiUrl:"/api/substation/getPagingListBySubstationName",bankArr:[],rechargeIsPosting:!0,reduceIsPosting:!0,substationName:"",currentPage:1,rechargeObj:{show:!1,common:"",money:""},deleMoneyObj:{show:!1,common:"",money:""},resetPassObj:{show:!1},stationSetObj:{show:!1,type:0,stationId:"",stationName:"",getAccount:"",payer:"",getBankName:"",otherBankName:"",kefuChat:"",kefuQQ:"",kefuPhone:"",siterName:"",siterPhone:"",siterQQ:"",stationAddress:"",adminPassword:"",yuantongPrice:"",adminAccount:""},tableData:[]}},computed:i()({params:function(){return{channelId:this.userInfo.channelId,substationName:this.substationName,pageNo:this.pageNo,pageSize:this.pageSize}}},Object(n.mapGetters)(["userInfo"])),methods:{getBank:function(){var t=this;this.$ajax.post("/api/config/bankCard/getBankInfoList",{}).then(function(e){"200"===e.data.code?t.bankArr=e.data.data:t.$message({message:e.data.message,type:"warning"})}).catch(function(t){})},sureToRecharge:function(){var t=this;this.rechargeIsPosting=!1,this.$ajax.post("/api/substation/recharge/addMoneyToSubstationFund",{money:this.rechargeObj.money,comment:this.rechargeObj.common,substationId:this.rechargeObj.row.substationId,operateUserId:this.userInfo.channelAccountId}).then(function(e){if("200"===e.data.code){for(var a in t.rechargeObj.show=!1,t.getList(),t.$message({message:"操作成功!",type:"success"}),t.rechargeObj)"show"!==a&&(t.rechargeObj[a]="");t.rechargeIsPosting=!0}else t.$message({message:e.data.message,type:"warning"})}).catch(function(e){t.$message.error("服务器错误！")})},sureToDele:function(){var t=this;this.reduceIsPosting=!1,this.$ajax.post("/api/substation/recharge/reduceMoneyFromSubstationFund",{money:this.deleMoneyObj.money,comment:this.deleMoneyObj.common,substationId:this.deleMoneyObj.row.substationId,operateUserId:this.userInfo.channelAccountId}).then(function(e){if("200"===e.data.code){for(var a in t.deleMoneyObj.show=!1,t.getList(),t.$message({message:"操作成功!",type:"success"}),t.deleMoneyObj)"show"!==a&&(t.deleMoneyObj[a]="");t.reduceIsPosting=!0}else t.$message({message:e.data.message,type:"warning"})}).catch(function(e){t.$message.error("服务器错误！")})},userSet:function(t){if(0===t[1])this.rechargeObj.show=!0,this.rechargeObj.row=t[0];else if(1===t[1]){this.stationSetObj.type=0;var e=t[0];this.stationSetObj={show:this.stationSetObj.show,type:this.stationSetObj.type,stationId:e.substationId,stationName:e.name,getAccount:e.recipetAccount,payer:e.recipetUserName,getBankName:e.recipetBankName,otherBankName:e.recipetBankName,kefuChat:e.serviceWechatNum,kefuQQ:e.serviceQq,kefuPhone:e.servicePhone,siterName:e.masterName,siterPhone:e.masterPhone,siterQQ:e.masterQq,stationAddress:e.domainName,adminPassword:e.adminPassword,yuantongPrice:e.price,adminAccount:e.adminUserName},this.stationSetObj.show=!0}else if(2===t[1]){for(var a in this.stationSetObj.type=1,this.stationSetObj)"type"!==a&&"show"!==a&&(this.stationSetObj[a]="");this.stationSetObj.show=!0}else 3===t[1]?(this.deleMoneyObj.row=t[0],this.deleMoneyObj.show=!0):4===t[1]&&(this.resetPassObj.row=t[0],this.resetPassObj.show=!0)},sureToReset:function(){var t=this;this.$ajax.post("/api/substation/resetPwd",{channenlAccountId:this.userInfo.channelAccountId,substationAccountId:this.resetPassObj.row.adminAccountId}).then(function(e){"200"===e.data.code?(t.$message({message:"操作成功",type:"success"}),t.getList(),t.resetPassObj.show=!1):t.$message({message:e.data.message,type:"warning"})}).catch(function(){t.$message.error("服务器错误！")})},setList:function(t){this.tableData=t},sureToPost:function(){var t=this,e="";0===this.stationSetObj.type?e="/api/substation/updateSubstationInfo":1===this.stationSetObj.type&&(e="/api/substation/addSubstation"),this.$ajax.post(e,{substationId:this.stationSetObj.stationId,substationName:this.stationSetObj.stationName,recipetContent:("999"===this.stationSetObj.getBankName?this.stationSetObj.otherBankName:this.stationSetObj.getBankName)+"-"+this.stationSetObj.payer+"-"+this.stationSetObj.getAccount,serviceQQ:this.stationSetObj.kefuQQ,serviceWechatNum:this.stationSetObj.kefuChat,serviceTelephone:this.stationSetObj.kefuPhone,masterName:this.stationSetObj.siterName,masterTelephone:this.stationSetObj.siterPhone,masterQQ:this.stationSetObj.siterQQ,domainName:this.stationSetObj.stationAddress,adminUserName:this.stationSetObj.adminAccount,adminPassword:this.stationSetObj.adminPassword?c()(this.stationSetObj.adminPassword):"",price:this.stationSetObj.yuantongPrice,channelId:this.userInfo.channelId,channelAccountId:this.userInfo.channelAccountId,recipetName:this.stationSetObj.payer,recipetAccount:this.stationSetObj.getAccount,recipetBankName:"999"===this.stationSetObj.getBankName?this.stationSetObj.otherBankName:this.stationSetObj.getBankName}).then(function(e){if("200"===e.data.code)for(var a in t.stationSetObj.show=!1,t.getList(),t.$message({message:"操作成功!",type:"success"}),t.stationSetObj)"type"!==a&&"show"!==a&&(t.stationSetObj[a]="");else t.$message({message:e.data.message,type:"warning"})}).catch(function(e){t.$message.error("服务器错误！")})}},mounted:function(){this.getBank()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stationManger"},[a("h2",[t._v("分站管理")]),t._v(" "),a("div",{staticClass:"search"},[a("div",{staticClass:"left"},[a("span",[t._v("站点名称")]),t._v(" "),a("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:"输入站点名称"},model:{value:t.substationName,callback:function(e){t.substationName=e},expression:"substationName"}}),t._v(" "),a("em",{staticClass:"btn",on:{click:t.getList}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"right"},[a("em",{staticClass:"btn-b",on:{click:function(e){t.userSet([{},2])}}},[t._v("添加分站")])])]),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{fixed:"left",prop:"substationId",label:"站点ID",align:"center",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"站点名称",align:"center",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{"font-size":"12px"}},[t._v("圆通: "+t._s(e.row.price))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"balance",label:"账户余额",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"rechargeSum",label:"累计充值",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"recipetAccount",label:"收款帐号",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{"text-align":"left"}},[a("p",[t._v(t._s(e.row.recipetContent))]),t._v(" "),a("p",[t._v("转账(注意: 本站收款账号不 定时更换请每次转账前核对 收款账号)")]),t._v(" "),a("p",[t._v("到账时间: 转账后请联系站长帮您充值")])])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"serviceQq",label:"客服QQ",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"serviceWechatNum",label:"客服微信",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"servicePhone",label:"客服电话",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.userSet([e.row,0])}}},[t._v("手动充值")]),t._v(" "),a("el-dropdown",{on:{command:t.userSet}},[a("span",{staticStyle:{"font-size":"12px",color:"#409EFF"}},[t._v("\n              更多\n              "),a("i",{staticClass:"el-icon-arrow-down"})]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:[e.row,1]}},[t._v("编辑")]),t._v(" "),a("el-dropdown-item",{attrs:{command:[e.row,3]}},[t._v("扣除金额")]),t._v(" "),a("el-dropdown-item",{attrs:{command:[e.row,4]}},[t._v("重置密码")])],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"domainName",label:"域名",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adminUserName",label:"管理员",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gmtCreate",label:"添加时间",align:"center",width:"180"}})],1)],1),t._v(" "),a("div",{staticClass:"pager"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":t.pageSizeArray,"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.pageTotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("div",{staticClass:"alertGrounp"},[a("el-dialog",{attrs:{title:"充值","append-to-body":!0,visible:t.rechargeObj.show,width:"600px",top:"25vh"},on:{"update:visible":function(e){t.$set(t.rechargeObj,"show",e)}}},[a("div",{staticClass:"cont",staticStyle:{"text-align":"center"}},[a("span",[t._v("金额")]),t._v(" "),a("el-input",{staticStyle:{width:"300px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.rechargeObj.money,callback:function(e){t.$set(t.rechargeObj,"money",e)},expression:"rechargeObj.money"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",[t._v("备注")]),t._v(" "),a("el-input",{staticStyle:{width:"300px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.rechargeObj.common,callback:function(e){t.$set(t.rechargeObj,"common",e)},expression:"rechargeObj.common"}})],1),t._v(" "),a("div",{staticClass:"buttons",staticStyle:{"text-align":"center","margin-top":"40px"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.rechargeIsPosting,expression:"rechargeIsPosting"}],staticClass:"btn",on:{click:t.sureToRecharge}},[t._v("确定")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!t.rechargeIsPosting,expression:"!rechargeIsPosting"}],staticClass:"btn"},[a("em",{staticClass:"el-icon-loading"})])])]),t._v(" "),a("el-dialog",{attrs:{title:"扣除余额","append-to-body":!0,visible:t.deleMoneyObj.show,width:"600px",top:"25vh"},on:{"update:visible":function(e){t.$set(t.deleMoneyObj,"show",e)}}},[a("div",{staticClass:"cont",staticStyle:{"text-align":"center"}},[a("span",[t._v("金额")]),t._v(" "),a("el-input",{staticStyle:{width:"300px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.deleMoneyObj.money,callback:function(e){t.$set(t.deleMoneyObj,"money",e)},expression:"deleMoneyObj.money"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",[t._v("备注")]),t._v(" "),a("el-input",{staticStyle:{width:"300px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.deleMoneyObj.common,callback:function(e){t.$set(t.deleMoneyObj,"common",e)},expression:"deleMoneyObj.common"}})],1),t._v(" "),a("div",{staticClass:"buttons",staticStyle:{"text-align":"center","margin-top":"40px"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.reduceIsPosting,expression:"reduceIsPosting"}],staticClass:"btn",on:{click:t.sureToDele}},[t._v("确定")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!t.reduceIsPosting,expression:"!reduceIsPosting"}],staticClass:"btn"},[a("em",{staticClass:"el-icon-loading"})])])]),t._v(" "),a("el-dialog",{attrs:{title:"重置密码","append-to-body":!0,visible:t.resetPassObj.show,width:"600px",top:"25vh"},on:{"update:visible":function(e){t.$set(t.resetPassObj,"show",e)}}},[a("div",{staticClass:"cont",staticStyle:{"text-align":"center"}},[a("span",{staticStyle:{"font-size":"18px","font-wight":"bold"}},[t._v("你确定要重置该用户的密码吗?请谨慎操作")])]),t._v(" "),a("div",{staticClass:"buttons",staticStyle:{"text-align":"center","margin-top":"40px"}},[a("span",{staticClass:"btn-b",staticStyle:{"margin-right":"10px"},on:{click:function(e){t.resetPassObj.show=!1}}},[t._v("取消")]),t._v(" "),a("span",{staticClass:"btn",on:{click:t.sureToReset}},[t._v("确定")])])]),t._v(" "),a("el-dialog",{attrs:{title:0==t.stationSetObj.type?"编辑分站":"添加分站","append-to-body":!0,visible:t.stationSetObj.show,width:"600px",top:"5vh"},on:{"update:visible":function(e){t.$set(t.stationSetObj,"show",e)}}},[0==t.stationSetObj.type?a("div",{staticClass:"cont",staticStyle:{"text-align":"center"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("站点编码")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.stationId,callback:function(e){t.$set(t.stationSetObj,"stationId",e)},expression:"stationSetObj.stationId"}})],1):t._e(),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("分站名称")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.stationName,callback:function(e){t.$set(t.stationSetObj,"stationName",e)},expression:"stationSetObj.stationName"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("收款人")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.payer,callback:function(e){t.$set(t.stationSetObj,"payer",e)},expression:"stationSetObj.payer"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("收款卡银行")]),t._v(" "),a("el-select",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请选择"},model:{value:t.stationSetObj.getBankName,callback:function(e){t.$set(t.stationSetObj,"getBankName",e)},expression:"stationSetObj.getBankName"}},[t._l(t.bankArr,function(t,e){return a("el-option",{key:e,attrs:{label:t.bankName,value:t.bankName}})}),t._v(" "),a("el-option",{attrs:{label:"其他",value:"999"}})],2)],1),t._v(" "),999==t.stationSetObj.getBankName?a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}}),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.otherBankName,callback:function(e){t.$set(t.stationSetObj,"otherBankName",e)},expression:"stationSetObj.otherBankName"}})],1):t._e(),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("收款卡号")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.getAccount,callback:function(e){t.$set(t.stationSetObj,"getAccount",e)},expression:"stationSetObj.getAccount"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("客服微信")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.kefuChat,callback:function(e){t.$set(t.stationSetObj,"kefuChat",e)},expression:"stationSetObj.kefuChat"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("客服QQ")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.kefuQQ,callback:function(e){t.$set(t.stationSetObj,"kefuQQ",e)},expression:"stationSetObj.kefuQQ"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("客服电话")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.kefuPhone,callback:function(e){t.$set(t.stationSetObj,"kefuPhone",e)},expression:"stationSetObj.kefuPhone"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("站长姓名")]),t._v(" "),a("el-input",{staticStyle:{width:"153px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.siterName,callback:function(e){t.$set(t.stationSetObj,"siterName",e)},expression:"stationSetObj.siterName"}}),t._v(" "),a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("站长电话")]),t._v(" "),a("el-input",{staticStyle:{width:"153px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.siterPhone,callback:function(e){t.$set(t.stationSetObj,"siterPhone",e)},expression:"stationSetObj.siterPhone"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("站长QQ")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.siterQQ,callback:function(e){t.$set(t.stationSetObj,"siterQQ",e)},expression:"stationSetObj.siterQQ"}})],1),t._v(" "),1==t.stationSetObj.type?a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("管理员帐号")]),t._v(" "),a("el-input",{staticStyle:{width:"153px","margin-left":"10px"},attrs:{disabled:0==t.stationSetObj.type,placeholder:"请输入内容"},model:{value:t.stationSetObj.adminAccount,callback:function(e){t.$set(t.stationSetObj,"adminAccount",e)},expression:"stationSetObj.adminAccount"}}),t._v(" "),a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("管理员密码")]),t._v(" "),a("el-input",{staticStyle:{width:"153px","margin-left":"10px"},attrs:{type:"password",placeholder:"请输入内容"},model:{value:t.stationSetObj.adminPassword,callback:function(e){t.$set(t.stationSetObj,"adminPassword",e)},expression:"stationSetObj.adminPassword"}}),t._v(" "),a("p",{staticStyle:{color:"#ff3341","text-align":"left","padding-left":"120px"}},[t._v("注: 管理员帐号添加后不可修改!")])],1):t._e(),t._v(" "),0==t.stationSetObj.type?a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("管理员帐号")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{disabled:0==t.stationSetObj.type,placeholder:"请输入内容"},model:{value:t.stationSetObj.adminAccount,callback:function(e){t.$set(t.stationSetObj,"adminAccount",e)},expression:"stationSetObj.adminAccount"}})],1):t._e(),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("圆通定价")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.yuantongPrice,callback:function(e){t.$set(t.stationSetObj,"yuantongPrice",e)},expression:"stationSetObj.yuantongPrice"}})],1),t._v(" "),a("div",{staticClass:"cont",staticStyle:{"text-align":"center","margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"70px","text-align":"right"}},[t._v("分站域名")]),t._v(" "),a("el-input",{staticStyle:{width:"400px","margin-left":"10px"},attrs:{placeholder:"请输入内容"},model:{value:t.stationSetObj.stationAddress,callback:function(e){t.$set(t.stationSetObj,"stationAddress",e)},expression:"stationSetObj.stationAddress"}})],1),t._v(" "),a("div",{staticClass:"buttons",staticStyle:{"text-align":"center","margin-top":"40px"}},[a("span",{staticClass:"btn-b",staticStyle:{"margin-right":"10px"},on:{click:function(e){t.stationSetObj.show=!1}}},[t._v("取消")]),t._v(" "),a("span",{staticClass:"btn",on:{click:t.sureToPost}},[t._v("确定")])])])],1)])},staticRenderFns:[]};var d=a("VU/8")(r,p,!1,function(t){a("Z1Zy")},"data-v-4b85832e",null);e.default=d.exports},Z1Zy:function(t,e){}});
//# sourceMappingURL=6.d69c9a5693036647ed20.js.map