import React, {useState, useRef, useEffect} from 'react';
import PropsTypes from 'prop-types';
import classnames from 'classnames';

function EditableStatement(props) {

    const [inEditMode, toggleEditMode] = useState(props.inEditMode);

    const inputRef = useRef();

    const handleClick = () => {
        if( inEditMode === false){
            toggleEditMode(true);
            inputRef.current.value = props.statement;
            setTimeout(() => inputRef.current.focus(), 0);
        }
    };

    const handleBlur = () => {
        toggleEditMode(false);
        props.onBlur(inputRef.current.value);
    };

    return (
        <div
            onClick={handleClick}
            className={"h5p-order-priority-editable-container"}
        >
            <div>
                <input
                    className={classnames("h5p-order-priority-editable", {
                        "hidden": inEditMode === false,
                    })}
                    ref={inputRef}
                    onBlur={handleBlur}
                />
                <div
                    className={classnames("h5p-order-priority-noneditable", {
                        "hidden": inEditMode === true,
                    })}
                >
                    {props.statement}
                </div>
            </div>
        </div>
    );
}

EditableStatement.propTypes = {
    statement: PropsTypes.string,
    inEditMode: PropsTypes.bool,
    onBlur: PropsTypes.func,
};

EditableStatement.defaultProps = {
    inEditMode: false,
};

export default EditableStatement;