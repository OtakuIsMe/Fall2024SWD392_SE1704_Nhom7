import React, { forwardRef, Ref } from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import './ScrollDownButton.css'

interface ChildProps {
    title: string;
}

const ScrollDownButton = forwardRef<HTMLDivElement, ChildProps>(({ title }, ref) => {

    const handleScrollToNextDiv = () => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id='down_btn' onClick={handleScrollToNextDiv}>
            <KeyboardDoubleArrowDownIcon />
        </div>
    );
});

export default ScrollDownButton;
