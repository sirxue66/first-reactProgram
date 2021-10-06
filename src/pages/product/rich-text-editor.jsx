/*
*  markdown富文本编辑器组件
*/
import React, {Component} from "react";
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import PropTypes from "prop-types"

class RichTextEditor extends Component {

    static propTypes = {
        detail:PropTypes.string
    }
    // state = {
    //     editorState:EditorState.createEmpty()
    // }

    constructor(props){
        super(props)
        let editorState;
        let det = this.props.detail;
        if(det){
            let blocksFromHtml = htmlToDraft(det)
            let { contentBlocks, entityMap } = blocksFromHtml
            let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
            editorState = EditorState.createWithContent(contentState)
        }
        this.state = {
            editorState:editorState || EditorState.createEmpty()
        }
    }
    // 将输入文本内容转换为html标签的标签文本字符串
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        }

    // 监控输入内容并获取内容更新状态值
    onEditorStateChange = (editorState) => {
                this.setState({
                editorState,
                })
            }

    render(){
        let {editorState} = this.state
        return(
            <Editor
            editorState={editorState}
            editorStyle={{minHeight:100, border: '1px solid #000', padding: '0 20px'}}
            onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}

export default RichTextEditor