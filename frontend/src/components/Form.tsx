import React from 'react';
import { Form, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const EmptyForm = ({ form, dataFields, labels, processValues, status, messages, nextStep }: {
    form: any;
    dataFields: string[];
    labels: { [key: string]: string; };
    processValues: (values: object) => void;
    status: string;
    messages: { [key: string]: string; };
    nextStep: any;
}) => {
    const { getFieldDecorator, getFieldsError, validateFields } = form;

    const { t } = useTranslation();

    function handleSubmit(e: any) {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                const highestDegree = localStorage.getItem('highestDegree');
                if(highestDegree){
                    localStorage.setItem('previousEmployer', JSON.stringify(values));
                    window.location.href = nextStep;
                }else{
                    localStorage.setItem('highestDegree', JSON.stringify(values));
                    window.location.href = nextStep;
                }
            }
        });
    }

    function hasErrors(fieldsError: any) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    return (
        <div className='empty-form'>
            <Form layout='vertical' onSubmit={handleSubmit}>
                {
                    dataFields.map((field: string) => (
                        <Form.Item label={t(labels[field])} key={field}>
                            { getFieldDecorator(field, {
                                rules: [{ required: true, message: t("components.form.error") }]
                            })(<Input />)}
                        </Form.Item>
                    ))
                }
                <Form.Item>
                    <Button
                        htmlType='submit'
                        style={{marginTop: '10%', backgroundColor: 'darkblue', height: '22%', color: 'white', textDecoration: 'none'}}
                    >
                        Continue
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedForm = Form.create({ name: 'form' })(EmptyForm);

export default WrappedForm;
