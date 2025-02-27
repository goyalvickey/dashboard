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

import { LOGS_PARENT_PLACEHOLDER } from '../common/components/breadcrumbs/component';

import { LogsComponent } from './component';

export const LOGS_ROUTE: Route = {
  path: ':resourceNamespace/:resourceName/:resourceType',
  component: LogsComponent,
  data: {
    breadcrumb: 'Logs',
    parent: LOGS_PARENT_PLACEHOLDER,
  },
};

@NgModule({
  imports: [RouterModule.forChild([LOGS_ROUTE])],
  exports: [RouterModule],
})
export class LogsRoutingModule {}
