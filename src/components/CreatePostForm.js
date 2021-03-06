import React from 'react';
import { Form, Input, Icon, Upload } from 'antd';

const FormItem = Form.Item;

class CreatePostForm extends React.Component {
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList; // return the second if the first exists.
    }

    beforeUpload = () => {
        return false;
    }

    getWrappedForm = () => {
        return this.props.form;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Form layout="vertical">
                <FormItem
                    {...formItemLayout}
                    label="Message">
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input a message.' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            rules: [{ required: true, message: 'Please select an image.' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload.Dragger
                                name="files"
                                beforeUpload={this.beforeUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>
            </Form>
        );
    }
}
// Decorated by Form.create() will be automatically set this.props.form property
export const WrappedCreatePostForm = Form.create()(CreatePostForm);
