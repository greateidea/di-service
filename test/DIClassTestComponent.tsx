import React from 'react';
import { Inject } from '../src/di/decorate/service';
import { INumberProvider } from './service/serviceInterface/constProvider';
import { IObjectProvider } from './service/serviceInterface/objectProvider';
// import { Inject } from 'di-service'; // npm pack test

class DIClassTestComponent extends React.Component {
    constructor(
        props: any,
        {},
        private services: {
            NumberService: INumberProvider,
            ObjectService: IObjectProvider
        }) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>DI Class Component Test</h2>
                <div>NumberService: {this.services.NumberService}</div>
                <div>ObjectService: {this.services.ObjectService.Score}</div>
            </div>
        )
    }
}

export default Inject(['NumberService', 'ObjectService'])(DIClassTestComponent);