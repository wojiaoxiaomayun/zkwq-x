<template>
	<!-- TODO: 后期加入vuesax4 中的卡片 -->
	<!-- TODO: 后期加入横向卡片，cover在左右侧 -->
    <div ref="XCard" class="x-card" :class="[(shadow == 'never' || shadow == false)?'':(shadow == 'always' || shadow == '' || shadow == true)?'x-card-shadow':shadow == 'hover'?'x-card-shadow-hover':'']" :style="{border:border?'':'none'}">
		<div v-if="title || ($slots.header && $slots.extra)" class="x-card-head" :style="{...headerStyle,border:border?'':'none'}">
			<div class="x-card-head-header">
				<slot name="header">
					{{title}}
				</slot>
			</div>
			<div class="x-card-head-extra">
				<slot name="extra"></slot>
			</div>
		</div>
		<div v-if="!title && $slots.header && !$slots.extra" class="x-card-head" :style="{...headerStyle,border:border?'':'none'}">
			<slot name="header">
			</slot>
		</div>
		<div v-if="$slots.cover" class="x-card-cover" :style="{...coverStyle,border:border?'':'none'}">
			<slot name="cover"></slot>
		</div>
		<div v-if="$slots.default" class="x-card-content" :style="{...contentStyle,border:border?'':'none'}">
			<slot></slot>
		</div>
		<div v-if="$slots.footer" class="x-card-footer" :style="{...footerStyle,border:border?'':'none'}">
			<slot name="footer"></slot>
		</div>
		<div v-if="$slots.action" class="x-card-action" :style="{...actionStyle,border:border?'':'none'}">
			<slot name="action"></slot>
		</div>
    </div>
</template>

<script>
	let ShadowEnum = {
		NEVER:'never',
		ALWAYS:'always',
		HOVER:'hover'
	};
	export default {
		name:'XCard',
		props:{
			title:String,
			shadow:{
				type:String | Boolean,
				default:false
			},
			border:{
				type:Boolean,
				default:false
			},
			headerStyle:Object,
			coverStyle:Object,
			contentStyle:Object,
			footerStyle:Object,
			actionStyle:Object
		}
	}
</script>

<style lang="scss">
	@import '../base/ui/style/var.scss';
    .x-card{
		--shadow-color:rgba(0, 0, 0, 0.1);
        width: 100%;
        display: inline-flex;
        flex-direction: column;
		border:1px solid $--border-color-lighter;
		background: $--color-white;
		color: $--color-text-primary;

		.x-card-head{
			display: inline-flex;
			padding: 8px 16px;
			flex-direction: row;
			justify-content: space-between;
			user-select: none;
			font-size: 16px;
			text-align: left;
			// border-bottom: 1px solid var(--border-color);
			.x-card-head-header{
				flex: 1;
				margin-right: 8px;
			}
		}
		.x-card-content{
			padding: 8px 16px;
			text-align: left;
			// border-bottom: 1px solid var(--border-color);
		}
		.x-card-footer{
			padding: 12px 16px;
			text-align: left;
			// border-bottom: 1px solid var(--border-color);
		}
		.x-card-action{
			padding: 12px 16px;
			text-align: left;
		}
    }
	.x-card.x-card-shadow{
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.05);
	}
	.x-card.x-card-shadow-hover:hover{
		transform: translateY(-3px);
		transition: all .1s;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.05);
	}
</style>