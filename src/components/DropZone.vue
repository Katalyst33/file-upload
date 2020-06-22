<template>
    <div class="container">
        <div class="section">
            <form @submit.prevent="sendFile" enctype="multipart/form-data">

                <div v-if="message"
                     :class="`message ${error ? 'is-danger': 'is-success'}`"
                >
                    <div class="message-body">{{message}}</div>
                </div>

                <div class="dropzone">
                    <input
                            type="file"
                            class="input-field"
                    ref="file"
                    @change="sendFile"/>
                    <p v-if="!uploading" class="call-to-action">
                        Drag your files here
                    </p>

                    <p v-if="uploading" class="progress-bar">

                    </p>


                </div>


            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "DropZone",
        data() {
            return {
                file: "",
                message: '',
                error: false,
                uploading: false
            }
        },


        methods: {
            selectFile() {
                const file = this.$refs.file.files[0];

                this.file = file;


            },

            async sendFile() {
                const formData = new FormData();
                formData.append('file', this.file);
                try {
                    await axios.post('/api/dropzone', formData);


                } catch (err) {
                    this.message = err.response.data.error;
                    this.error = true;

                }

            },


        }
    }
</script>

<style scoped>
    .dropzone {
        min-height: 200px;
        padding: 10px 10px;
        position: relative;;
        cursor: pointer;
        outline: 2px dashed grey;
        outline-offset: -10px;
        background-color: lightcyan;
        color: dimgray;

    }

    .input-field {
        opacity: 0;
        width: 100px;
        height: 200px;
    }

    .dropzone:hover {
        background-color: lightblue;
    }

    .dropzone .call-to-action{
        font-size: 1.2rem;
        text-align: center;
        padding: 50px 0;

    }
</style>
