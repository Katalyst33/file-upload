<template>
    <div class="container">
        <div class="section">
            <form @submit.prevent="sendFile" enctype="multipart/form-data">

                <div v-if="message"
                     :class="`message ${error ? 'is-danger': 'is-success'}`"
                >
                    <div class="message-body">{{message}}</div>
                </div>

                <div class="field">

                    <div class="file is-boxed is-warning">
                        <label class="file-label">

                            <input
                                    multiple
                                    type="file"
                                    ref="files"
                                    @change="selectFile"
                                    class="file-input"
                            />

                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-uploader"></i>
                            </span>
                            <span class="file-label">
                                Choose a file...
                            </span>

                        </span>
                        </label>
                    </div>
                    <label for="file" class="label">
                        Upload File
                    </label>

                </div>


                <div class="field">
                    <div v-for="(file, index) in files" :key="index"
                         :class="`level ${file.invalidMessage && 'has-text-danger'}`"
                    >
                        <div class="level-left">
                            <div class="level-item">
                                {{file.name}}
                                <span v-if="file.invalidMessage">&nbsp; -{{file.invalidMessage}}</span>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <a @click.prevent="files.splice(index, 1);
uploadFiles.splice(index, 1)" class="delete"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <button class="button is-info">Send</button>
                </div>


            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import _ from 'lodash'

    export default {
        name: "SimpleUpload",
        data() {
            return {
                files: [],
                uploadFiles: [],
                message: '',
                error: false
            }
        },

        mounted() {

        },

        methods: {
            selectFile() {
                const files = this.$refs.files.files;
                this.uploadFiles = [...this.uploadFiles, ...files];
                this.files = [
                    ...this.files,
                    ..._.map(files, file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        invalidMessage: this.validate(file)
                    }))
                ]

            },

            validate(file) {
                const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                const MAX_SIZE = 200000;

                if (file.size > MAX_SIZE) {
                    return `Max size:${MAX_SIZE / 1000}kb`;

                }
                if (!allowedTypes.includes(file.type)) {
                    return "file is not image";
                }
                return "";
            },
            async sendFile() {
                const formData = new FormData();
                _.forEach(this.uploadFiles, file => {
                    if (this.validate(file) === "") {
                        formData.append('files', file);
                    }
                });
                try {
                    await axios.post('/api/multiUpload', formData)
                    this.message = "Files has been uploaded";
                    this.files = [];
                    this.uploadFiles = [];

                } catch (err) {
                    this.message = err.response.data.error;
                    this.error = true;
                }

            },


        }
    }
</script>

<style scoped>

</style>
