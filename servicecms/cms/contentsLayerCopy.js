var $api=new apiUtils.Api(apiUrl+"/pages/cms/contentsLayerCopy"),$apiChannels=new apiUtils.Api(apiUrl+"/pages/cms/contentsLayerCopy/actions/getChannels"),data={siteId:parseInt(pageUtils.getQueryString("siteId")),channelId:parseInt(pageUtils.getQueryString("channelId")),contentIds:pageUtils.getQueryString("contentIds"),pageLoad:!1,pageAlert:null,contents:null,sites:[],channels:[],site:{},channel:null,copyType:"Copy",isSubmit:!1},methods={loadConfig:function(){var e=this;$api.get({siteId:e.siteId,channelId:e.channelId,contentIds:e.contentIds},function(t,n){!t&&n&&n.value&&(e.contents=n.value,e.sites=n.sites,e.channels=n.channels,e.site=n.site,e.pageLoad=!0)})},onSiteSelect(e){if(e.id!==this.site.id){this.site=e;var t=this;parent.pageUtils.loading(!0),$apiChannels.get({siteId:this.site.id},function(e,n){parent.pageUtils.loading(!1),!e&&n&&n.value&&(t.channels=n.value,t.channel=null)})}},onChannelSelect(e){this.channel=e},btnSubmitClick:function(){this.isSubmit=!0,this.channel&&(parent.pageUtils.loading(!0),$api.post({siteId:this.siteId,channelId:this.channelId,contentIds:this.contentIds,targetSiteId:this.site.id,targetChannelId:this.channel.id,copyType:this.copyType},function(e,t){!e&&t&&t.value&&parent.location.reload(!0)}))}};Vue.component("multiselect",window.VueMultiselect.default),new Vue({el:"#main",data:data,methods:methods,created:function(){this.loadConfig()}});