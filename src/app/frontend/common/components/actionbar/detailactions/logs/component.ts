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

import { Component, Input } from '@angular/core';

import { ResourceMeta } from '../../../../services/global/actionbar';
import { KdStateService } from '../../../../services/global/state';

@Component({
  selector: 'kd-actionbar-detail-logs',
  templateUrl: './template.html',
})
export class ActionbarDetailLogsComponent {
  @Input() resourceMeta: ResourceMeta;

  constructor(private readonly kdState_: KdStateService) {}

  getHref(): string {
    return this.kdState_.href(
      'log',
      this.resourceMeta.objectMeta.name,
      this.resourceMeta.objectMeta.namespace,
      this.resourceMeta.typeMeta.kind
    );
  }
}
