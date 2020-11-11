import React from 'react';
import { Service } from '../di/decorate/service';
import { ILog } from './service/serviceInterface/log';
import { IClassProvider } from './service/serviceInterface/classProvider';
import { INumberProvider } from './service/serviceInterface/constProvider';
import { IFunctionProvider } from './service/serviceInterface/functionProvider';
import { IObjectProvider } from './service/serviceInterface/objectProvider';

import './service/log.service';
import './service/log2.service';
import './service/log3.service';
import './service/log4.service';
import './service/numberProvider.service';
import './service/objectProvider.service';
import './service/classProvider.service';
import './service/functionProvider.service';

@Service([
    'LogService',
    'FunctionService',
    'ObjectService',
    'NumberService',
    'ClassService',
])
export default class DITest2 extends React.Component {
    state = { score: 211 }
    constructor(props: any, {}, private Services: { LogService: ILog, FunctionService: IFunctionProvider, NumberService: INumberProvider, ClassService: IClassProvider, ObjectService: IObjectProvider }) {
        super(props);
    }

    render() {
        return (
            <div
                onClick={() => {
                    this.setState({ score: ++this.state.score }, () => {
                        this.Services.LogService.log(this.state.score);
                        this.Services.FunctionService('[ObjectService]', this.Services.ObjectService.Score);
                        this.Services.ClassService.log('[NumberService]', this.Services.NumberService);
                    })
                }}
            > My Score Is: {this.state.score}</div>
        )
    }
}