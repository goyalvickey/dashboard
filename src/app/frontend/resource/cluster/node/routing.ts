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

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DEFAULT_ACTIONBAR } from '../../../common/components/actionbars/routing';

import { CLUSTER_ROUTE } from '../routing';

import { NodeDetailComponent } from './detail/component';
import { NodeListComponent } from './list/component';

const NODE_LIST_ROUTE: Route = {
  path: '',
  component: NodeListComponent,
  data: {
    breadcrumb: 'Nodes',
    parent: CLUSTER_ROUTE,
  },
};

const NODE_DETAIL_ROUTE: Route = {
  path: ':resourceName',
  component: NodeDetailComponent,
  data: {
    breadcrumb: '{{ resourceName }}',
    parent: NODE_LIST_ROUTE,
  },
};

@NgModule({
  imports: [
    RouterModule.forChild([
      NODE_LIST_ROUTE,
      NODE_DETAIL_ROUTE,
      DEFAULT_ACTIONBAR,
    ]),
  ],
  exports: [RouterModule],
})
export class NodeRoutingModule {}
