<!--
 * @Author: sun
 * @Date: 2021/7/13 18:26
 * @title: Alert
 * @Description:消息提示栏
 * @version: 1.0
 -->
<template>
    <div>
        <el-alert
                v-bind:title="message"
                v-bind:type="status"
                v-bind:description="description"
                v-show="show"
                center
                @close="close"
                show-icon>
        </el-alert>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { ElMessage } from 'element-plus'
    export default {
        data() {
            return {
                message: "",
                status: "",
                description: "",
                show:false
            }
        },
        methods: {

            /**
             * 第一个参数是消息，第二个参数是状态，第三个参数是描述
             * 状态：
             * success 成功 info 提示 waring 警告 error 错误
             * @date 2021/8/3 17:48
             * @author sun
             * @param message，status，description
             * @return
             */
            setAlert(){
                console.log(arguments)
                //这里这样写的原因是js里面没有重载，相同名称会覆盖所以这里使用arguments来进行操作，但就要要求传入数据的规范
                if (arguments.length==2){
                 //没有description
                 this.setAlert1(arguments[0],arguments[1])
                }else{
                    this.setAlert2(arguments[0],arguments[1],arguments[3])
                }
                this.show=true
            },
            setAlert1 (message, status) {
                this.message = message
                this.status = status
            },
            setAlert2 (message, status, description) {
                this.message = message
                this.status = status
                this.description = description
            },
            close(){
                this.show=false
            }

        }
    }
</script>

<style scoped>

</style>