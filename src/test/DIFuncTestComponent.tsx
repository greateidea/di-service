import React from 'react';
import { Inject } from '../di/decorate/service';
import { INumberProvider } from './service/serviceInterface/constProvider';
import { IObjectProvider } from './service/serviceInterface/objectProvider';

const DIFuncTestComponent = (props: any, {}, services: { NumberService: INumberProvider, ObjectService: IObjectProvider }) => {
return (
        <div>
            <div>NumberService: {services.NumberService}</div>
            <div>ObjectService: {services.ObjectService.Score}</div>
        </div>
    )
}

export default Inject(['NumberService', 'ObjectService'])(DIFuncTestComponent);