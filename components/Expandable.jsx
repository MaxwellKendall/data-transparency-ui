
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import TooltipComponent from './infoTooltip/TooltipComponent';
import TooltipWrapper from './infoTooltip/TooltipWrapper';

require('../styles/components/_expandable.scss');

const ExampleTooltip = () => (
    <TooltipComponent title="Details">
        <p>Here is some sample content.</p>
    </TooltipComponent>
);

const Expandable = ({
    icon = <FontAwesomeIcon icon="map-marker" size="2x" />,
    children,
    defaultExpandedState = false,
    title = "Award Spending Over Time",
    header = "Award Spending"
}) => {
    const ref = useRef(null);
    const [isExpanded, setExpanded] = useState(defaultExpandedState);
    useEffect(() => {
        if (ref.current) {
            console.log('ref', ref.current.getBoundingClientRect().height);
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    return (
        <div className="usda-expandable__container">
            {icon}
            <div className="usda-expandable__header">
                <strong className="usda-expandable__subheader">{header}</strong>
                <h3 className="usda-expandable__title">
                    {title}
                </h3>
            </div>
            <TooltipWrapper tooltipComponent={<ExampleTooltip />} icon="info" />
            <span className="usda-expandable__context">This section covers <strong>{header}</strong></span>
            <TooltipWrapper
                tooltipComponent={<ExampleTooltip />}
                icon="info"
                // controlledProps={{
                //     isControlled: true,
                //     isVisible: true,
                //     showTooltip: () => {},
                //     closeTooltip: () => {},
                // }}
                tooltipPosition="left" />
            <FontAwesomeIcon
                className="usda-expandable__expand-icon"
                onClick={toggleExpand}
                size="2x"
                icon={isExpanded ? "chevron-up" : "chevron-down"} />
            <hr />
            <CSSTransition
                in={isExpanded}
                className="usda-expandable"
                classNames="usda-expandable-animating"
                timeout={{ enter: 1000, exit: 500 }}>
                {children}
            </CSSTransition>
        </div>
    );
};

Expandable.propTypes = {
    icon: PropTypes.element,
    children: PropTypes.element,
    defaultExpandedState: PropTypes.bool,
    title: PropTypes.string,
    header: PropTypes.string
};

export default Expandable;
