webpackJsonp([8],{cW6R:function(t,e){},epW7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("ZYmg"),s={data:function(){return{blogs:[],total:0,page:1}},created:function(){var t=this;this.page=parseInt(this.$route.query.page)||1,n.a.getBlogs({page:this.page}).then(function(e){t.blogs=e.data,t.total=e.total,t.page=e.page})},methods:{pageChange:function(t){var e=this;n.a.getBlogs({page:t}).then(function(a){e.blogs=a.data,e.total=a.total,e.page=a.page,e.$router.push({path:"/",query:{page:t}})})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"index"}},[a("section",t._l(t.blogs,function(e){return a("div",{key:e.id,staticClass:"item"},[a("figure",{staticClass:"avatar"},[a("router-link",{attrs:{to:"/user/"+e.user.id}},[a("img",{attrs:{src:e.user.avatar,alt:""}}),t._v(" "),a("figcaption",[t._v(t._s(e.user.username))])])],1),t._v(" "),a("router-link",{staticClass:"content",attrs:{to:"/detail/"+e.id}},[a("h3",[t._v(t._s(e.title)+" "),a("span",[t._v(t._s(t.changeTime(e.createdAt)))])])]),t._v(" "),a("router-link",{staticClass:"content",attrs:{to:"/detail/"+e.id}},[a("p",[t._v(t._s(e.description))])])],1)})),t._v(" "),a("section",{staticClass:"changePage"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total,"current-page":t.page},on:{"current-change":t.pageChange,"update:currentPage":function(e){t.page=e}}})],1)])},staticRenderFns:[]};var i=a("VU/8")(s,r,!1,function(t){a("cW6R")},"data-v-05cab4b2",null);e.default=i.exports}});
//# sourceMappingURL=8.c35915a386a12b91e2d9.js.map