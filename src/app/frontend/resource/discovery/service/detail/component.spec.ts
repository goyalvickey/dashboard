// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatTooltipModule,
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppConfig, K8sError, ServiceDetail } from '@api/backendapi';
import { CardComponent } from 'common/components/card/component';
import { ChipsComponent } from 'common/components/chips/component';
import { ObjectMetaComponent } from 'common/components/objectmeta/component';
import { PropertyComponent } from 'common/components/property/component';
import { PipesModule } from 'common/pipes/module';
import { ConfigService } from 'common/services/global/config';
import { NamespacedResourceService } from 'common/services/resource/resource';

import { ServiceDetailComponent } from './component';

const maxiName = 'my-maxi-service';

@Component({ selector: 'test', templateUrl: './template.html' })
class MaxiTestComponent {
  isInitialized = true;
  service: ServiceDetail = {
    objectMeta: {
      name: maxiName,
      namespace: 'my-namespace',
      labels: {},
      creationTimestamp: '2018-05-18T22:27:42Z',
    },
    typeMeta: { kind: 'Service' },
    internalEndpoint: {
      host: 'hostname',
      ports: [{ name: 'broker', port: 9092, protocol: 'TCP' }],
    },
    externalEndpoints: [],
    endpointList: {
      listMeta: { totalItems: 1 },
      endpoints: [
        {
          objectMeta: { creationTimestamp: null },
          host: '172.17.0.5',
          nodeName: 'minikube',
          ports: [{ name: 'broker', port: 9092, protocol: 'TCP' }],
          ready: false,
          typeMeta: { kind: 'endpoint' },
        },
      ],
    },
    selector: {},
    type: 'LoadBalancer',
    clusterIP: '10.10.10.10',
    podList: {
      pods: [
        {
          podStatus: {
            podPhase: 'phase1',
            status: 'Ready',
            containerStates: [{ waiting: { reason: 'Still starting' } }],
          },
          restartCount: 1,
          metrics: {
            cpuUsage: 10,
            memoryUsage: 10,
            cpuUsageHistory: [{ timestamp: '2018-03-01T13:00:00Z', value: 10 }],
            memoryUsageHistory: [
              { timestamp: '2018-03-01T13:00:00Z', value: 10 },
            ],
          },
          nodeName: 'Pod1',
          objectMeta: {
            creationTimestamp: '2018-03-01T13:00:00Z',
            labels: {},
            name: 'metaname',
            namespace: 'my-namespace',
          },
          warnings: [
            {
              count: 2,
              type: 'event type',
              typeMeta: { kind: 'Service' },
              firstSeen: '',
              lastSeen: '',
              message: 'the event message',
              object: 'the object',
              reason: 'the reason',
              sourceHost: 'source host',
              sourceComponent: 'source component',
              objectMeta: {
                name: 'the name',
                namespace: 'the namespace',
                labels: {},
                creationTimestamp: '2018-03-01T13:00:00Z',
              },
            },
          ],
          typeMeta: { kind: 'Service' },
        },
      ],
      status: { failed: 2, pending: 1, running: 3, succeeded: 5 },
      cumulativeMetrics: [],
      listMeta: { totalItems: 1 },
      errors: [
        {
          ErrStatus: {
            message: 'error message',
            code: 10,
            status: 'Ready',
            reason: 'the reason',
          },
        } as K8sError,
      ],
    },
    sessionAffinity: 'affinity1',
    errors: [],
  };
}

describe('ServiceDetailComponent', () => {
  let httpMock: HttpTestingController;
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ObjectMetaComponent,
        MaxiTestComponent,
        CardComponent,
        PropertyComponent,
        ChipsComponent,
        ServiceDetailComponent,
      ],
      imports: [
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatTooltipModule,
        MatDialogModule,
        MatChipsModule,
        NoopAnimationsModule,
        PipesModule,
        HttpClientTestingModule,
        MatIconModule,
        RouterModule,
      ],
      providers: [ConfigService, NamespacedResourceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    configService = TestBed.get(ConfigService);
  }));

  beforeEach(() => {
    configService.init();
    const configRequest = httpMock.expectOne('config');
    const config: AppConfig = { serverTime: new Date().getTime() };
    configRequest.flush(config);
  });

  it('shows a maxi service', () => {
    const fixture = TestBed.createComponent(MaxiTestComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(
      By.css('kd-property.object-meta-name div.kd-property-value div')
    );
    expect(debugElement).toBeTruthy();

    const htmlElement = debugElement.nativeElement;
    expect(htmlElement.innerHTML).toBe(maxiName);
  });
});
