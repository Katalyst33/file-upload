<template>
    <div>

        <div class="container">
            <div class="section">
                <h1 class="has-background-danger">UPLOAD UPLOADER</h1>

                <div class="image">
                    <img class="avatar" src="/img/user.png">
                </div>
            </div>
            <input
                    type="file"

                    ref="file"
            />
            <button class="button is-primary my-5">Upload image</button>
        </div>
    </div>
</template>

<script>
    import { Uppload, Local, xhrUploader, en } from "uppload";

    const uploader = new Uppload({
        lang: en,
        uploader: xhrUploader({
            endpoint: "/api/profile/"
        })
    });
    uploader.use(new Local());


    export default {

        methods:{

        }


    }
</script>

<style scoped>
    @import "~uppload/dist/uppload.css";
    @import "~uppload/dist/themes/light.css";

    .avatar {
        height: 50px;
        width: 50px
    }

</style>
