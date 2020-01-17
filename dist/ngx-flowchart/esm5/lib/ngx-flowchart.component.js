/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, IterableDiffers, NgZone, Output } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import { FcModelValidationService } from './modelvalidation.service';
import { FcNodeDraggingService } from './node-dragging.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcEdgeDraggingService } from './edge-dragging.service';
import { FcMouseOverService } from './mouseover.service';
import { FcRectangleSelectService } from './rectangleselect.service';
var NgxFlowchartComponent = /** @class */ (function () {
    function NgxFlowchartComponent(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.modelChanged = new EventEmitter();
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item;
        }));
        this.edgesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item;
        }));
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
    }
    Object.defineProperty(NgxFlowchartComponent.prototype, "canvasClass", {
        get: /**
         * @return {?}
         */
        function () {
            return FlowchartConstants.canvasClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        var _this = this;
        if (!this.dropTargetId && this.edgeStyle !== FlowchartConstants.curvedStyle && this.edgeStyle !== FlowchartConstants.lineStyle) {
            throw new Error('edgeStyle not supported.');
        }
        this.nodeHeight = this.nodeHeight || 200;
        this.nodeWidth = this.nodeWidth || 200;
        this.dragAnimation = this.dragAnimation || FlowchartConstants.dragAnimationRepaint;
        this.userCallbacks = this.userCallbacks || {};
        this.automaticResize = this.automaticResize || false;
        try {
            for (var _b = tslib_1.__values(Object.keys(this.userCallbacks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                /** @type {?} */
                var callback = this.userCallbacks[key];
                if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                    throw new Error('All callbacks should be functions.');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.cd, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        /** @type {?} */
        var applyFunction = this.zone.run.bind(this.zone);
        this.nodeDraggingService = new FcNodeDraggingService(this.modelService, applyFunction, this.automaticResize, this.dragAnimation);
        this.edgeDraggingService = new FcEdgeDraggingService(this.modelValidation, this.edgeDrawingService, this.modelService, this.model, this.userCallbacks.isValidEdge || null, applyFunction, this.dragAnimation, this.edgeStyle);
        this.mouseoverService = new FcMouseOverService(applyFunction);
        this.rectangleSelectService = new FcRectangleSelectService(this.modelService, element[0].querySelector('#select-rectangle'), applyFunction);
        this.callbacks = {
            nodeDragstart: this.nodeDraggingService.dragstart.bind(this.nodeDraggingService),
            nodeDragend: this.nodeDraggingService.dragend.bind(this.nodeDraggingService),
            edgeDragstart: this.edgeDraggingService.dragstart.bind(this.edgeDraggingService),
            edgeDragend: this.edgeDraggingService.dragend.bind(this.edgeDraggingService),
            edgeDrop: this.edgeDraggingService.drop.bind(this.edgeDraggingService),
            edgeDragoverConnector: this.edgeDraggingService.dragoverConnector.bind(this.edgeDraggingService),
            edgeDragoverMagnet: this.edgeDraggingService.dragoverMagnet.bind(this.edgeDraggingService),
            edgeDragleaveMagnet: this.edgeDraggingService.dragleaveMagnet.bind(this.edgeDraggingService),
            nodeMouseOver: this.mouseoverService.nodeMouseOver.bind(this.mouseoverService),
            nodeMouseOut: this.mouseoverService.nodeMouseOut.bind(this.mouseoverService),
            connectorMouseEnter: this.mouseoverService.connectorMouseEnter.bind(this.mouseoverService),
            connectorMouseLeave: this.mouseoverService.connectorMouseLeave.bind(this.mouseoverService),
            nodeClicked: (/**
             * @param {?} event
             * @param {?} node
             * @return {?}
             */
            function (event, node) {
                _this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            })
        };
        this.adjustCanvasSize(false);
    };
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.model) {
            /** @type {?} */
            var nodesChange = this.nodesDiffer.diff(this.model.nodes);
            /** @type {?} */
            var edgesChange = this.edgesDiffer.diff(this.model.edges);
            /** @type {?} */
            var nodesChanged_1 = false;
            /** @type {?} */
            var edgesChanged_1 = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                function () {
                    nodesChanged_1 = true;
                }));
                nodesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                function () {
                    nodesChanged_1 = true;
                }));
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                function () {
                    edgesChanged_1 = true;
                }));
                edgesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                function () {
                    edgesChanged_1 = true;
                }));
            }
            if (nodesChanged_1) {
                this.adjustCanvasSize(false);
            }
            if (nodesChanged_1 || edgesChanged_1) {
                this.cd.detectChanges();
            }
        }
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.getEdgeDAttribute = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    };
    /**
     * @param {?=} fit
     * @return {?}
     */
    NgxFlowchartComponent.prototype.adjustCanvasSize = /**
     * @param {?=} fit
     * @return {?}
     */
    function (fit) {
        var _this = this;
        /** @type {?} */
        var maxX = 0;
        /** @type {?} */
        var maxY = 0;
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            maxX = Math.max(node.x + _this.nodeWidth, maxX);
            maxY = Math.max(node.y + _this.nodeHeight, maxY);
        }));
        /** @type {?} */
        var width;
        /** @type {?} */
        var height;
        if (fit) {
            width = maxX;
            height = maxY;
        }
        else {
            width = Math.max(maxX, element.prop('offsetWidth'));
            height = Math.max(maxY, element.prop('offsetHeight'));
        }
        element.css('width', width + 'px');
        element.css('height', height + 'px');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.canvasClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseDown = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeClick = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeRemove = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeEdit = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeDoubleClick = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseOver = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseEnter = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseLeave = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mousedown(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mousemove(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mouseup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mouseup(event);
    };
    NgxFlowchartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-canvas',
                    template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
                }] }
    ];
    /** @nocollapse */
    NgxFlowchartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: FcModelValidationService },
        { type: FcEdgeDrawingService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    NgxFlowchartComponent.propDecorators = {
        canvasClass: [{ type: HostBinding, args: ['attr.class',] }],
        model: [{ type: Input }],
        selectedObjects: [{ type: Input }],
        edgeStyle: [{ type: Input }],
        userCallbacks: [{ type: Input }],
        automaticResize: [{ type: Input }],
        dragAnimation: [{ type: Input }],
        nodeWidth: [{ type: Input }],
        nodeHeight: [{ type: Input }],
        dropTargetId: [{ type: Input }],
        modelChanged: [{ type: Output }],
        dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        mousemove: [{ type: HostListener, args: ['mousemove', ['$event'],] }],
        mouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
    };
    return NgxFlowchartComponent;
}());
export { NgxFlowchartComponent };
if (false) {
    /** @type {?} */
    NgxFlowchartComponent.prototype.model;
    /** @type {?} */
    NgxFlowchartComponent.prototype.selectedObjects;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeStyle;
    /** @type {?} */
    NgxFlowchartComponent.prototype.userCallbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.automaticResize;
    /** @type {?} */
    NgxFlowchartComponent.prototype.dragAnimation;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeWidth;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeHeight;
    /** @type {?} */
    NgxFlowchartComponent.prototype.dropTargetId;
    /** @type {?} */
    NgxFlowchartComponent.prototype.modelChanged;
    /** @type {?} */
    NgxFlowchartComponent.prototype.callbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.modelService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeDraggingService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeDraggingService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.mouseoverService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.rectangleSelectService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.arrowDefId;
    /** @type {?} */
    NgxFlowchartComponent.prototype.arrowDefIdSelected;
    /** @type {?} */
    NgxFlowchartComponent.prototype.flowchartConstants;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.nodesDiffer;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.edgesDiffer;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.modelValidation;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeDrawingService;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUMxQyxTQUFTLEVBRVQsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBRUwsZUFBZSxFQUNmLE1BQU0sRUFDRSxNQUFNLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QyxrQkFBa0IsRUFBb0MsTUFBTSx3QkFBd0IsQ0FBQztBQUNwSSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckU7SUFrRUUsK0JBQW9CLFVBQW1DLEVBQ25DLE9BQXdCLEVBQ3hCLGVBQXlDLEVBQzFDLGtCQUF3QyxFQUN2QyxFQUFxQixFQUNyQixJQUFZO1FBTFosZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQzFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBc0I7UUFDdkMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsU0FBSSxH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Qyw0QkFBQztDQUFBLEFBbFJELElBa1JDO1NBNVFZLHFCQUFxQjs7O0lBT2hDLHNDQUNlOztJQUVmLGdEQUN1Qjs7SUFFdkIsMENBQ2tCOztJQUVsQiw4Q0FDNkI7O0lBRTdCLGdEQUN5Qjs7SUFFekIsOENBQ3NCOztJQUV0QiwwQ0FDa0I7O0lBRWxCLDJDQUNtQjs7SUFFbkIsNkNBQ3FCOztJQUVyQiw2Q0FDa0M7O0lBRWxDLDBDQUF1Qjs7SUFFdkIsa0RBQXFDOztJQUVyQyw2Q0FBNkI7O0lBQzdCLG9EQUEyQzs7SUFDM0Msb0RBQTJDOztJQUMzQyxpREFBcUM7O0lBQ3JDLHVEQUFpRDs7SUFFakQsMkNBQW1COztJQUNuQixtREFBMkI7O0lBRTNCLG1EQUF3Qzs7Ozs7SUFFeEMsNENBRUc7Ozs7O0lBRUgsNENBRUc7Ozs7O0lBRVMsMkNBQTJDOzs7OztJQUMzQyx3Q0FBZ0M7Ozs7O0lBQ2hDLGdEQUFpRDs7SUFDakQsbURBQStDOzs7OztJQUMvQyxtQ0FBNkI7Ozs7O0lBQzdCLHFDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBOZ1pvbmUsXG4gIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjRWRnZSwgRmNNb2RlbCwgRmNOb2RlLCBGbG93Y2hhcnRDb25zdGFudHMsIFVzZXJDYWxsYmFja3MsIFVzZXJOb2RlQ2FsbGJhY2tzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTm9kZURyYWdnaW5nU2VydmljZSB9IGZyb20gJy4vbm9kZS1kcmFnZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vdXNlT3ZlclNlcnZpY2UgfSBmcm9tICcuL21vdXNlb3Zlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZSB9IGZyb20gJy4vcmVjdGFuZ2xlc2VsZWN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYy1jYW52YXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmd4Rmxvd2NoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuY2xhc3MnKVxuICBnZXQgY2FudmFzQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc0NsYXNzO1xuICB9XG5cbiAgQElucHV0KClcbiAgbW9kZWw6IEZjTW9kZWw7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXTtcblxuICBASW5wdXQoKVxuICBlZGdlU3R5bGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB1c2VyQ2FsbGJhY2tzOiBVc2VyQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIGF1dG9tYXRpY1Jlc2l6ZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkcmFnQW5pbWF0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgbm9kZVdpZHRoOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgbm9kZUhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBtb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgbm9kZURyYWdnaW5nU2VydmljZTogRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlO1xuICBlZGdlRHJhZ2dpbmdTZXJ2aWNlOiBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2U7XG4gIG1vdXNlb3ZlclNlcnZpY2U6IEZjTW91c2VPdmVyU2VydmljZTtcbiAgcmVjdGFuZ2xlU2VsZWN0U2VydmljZTogRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlO1xuXG4gIGFycm93RGVmSWQ6IHN0cmluZztcbiAgYXJyb3dEZWZJZFNlbGVjdGVkOiBzdHJpbmc7XG5cbiAgZmxvd2NoYXJ0Q29uc3RhbnRzID0gRmxvd2NoYXJ0Q29uc3RhbnRzO1xuXG4gIHByaXZhdGUgbm9kZXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEZjTm9kZT4gPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlPEZjTm9kZT4oKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH0pO1xuXG4gIHByaXZhdGUgZWRnZXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEZjRWRnZT4gPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlPEZjRWRnZT4oKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5hcnJvd0RlZklkID0gJ2Fycm93LScgKyBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMuYXJyb3dEZWZJZFNlbGVjdGVkID0gdGhpcy5hcnJvd0RlZklkICsgJy1zZWxlY3RlZCc7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZHJvcFRhcmdldElkICYmIHRoaXMuZWRnZVN0eWxlICE9PSBGbG93Y2hhcnRDb25zdGFudHMuY3VydmVkU3R5bGUgJiYgdGhpcy5lZGdlU3R5bGUgIT09IEZsb3djaGFydENvbnN0YW50cy5saW5lU3R5bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWRnZVN0eWxlIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHRoaXMubm9kZUhlaWdodCA9IHRoaXMubm9kZUhlaWdodCB8fCAyMDA7XG4gICAgdGhpcy5ub2RlV2lkdGggPSB0aGlzLm5vZGVXaWR0aCB8fCAyMDA7XG4gICAgdGhpcy5kcmFnQW5pbWF0aW9uID0gdGhpcy5kcmFnQW5pbWF0aW9uIHx8IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludDtcbiAgICB0aGlzLnVzZXJDYWxsYmFja3MgPSB0aGlzLnVzZXJDYWxsYmFja3MgfHwge307XG4gICAgdGhpcy5hdXRvbWF0aWNSZXNpemUgPSB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSB8fCBmYWxzZTtcblxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMudXNlckNhbGxiYWNrcykpIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy51c2VyQ2FsbGJhY2tzW2tleV07XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nICYmIGtleSAhPT0gJ25vZGVDYWxsYmFja3MnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIGNhbGxiYWNrcyBzaG91bGQgYmUgZnVuY3Rpb25zLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MgPSB0aGlzLnVzZXJDYWxsYmFja3Mubm9kZUNhbGxiYWNrcztcblxuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbmV3IEZjTW9kZWxTZXJ2aWNlKHRoaXMubW9kZWxWYWxpZGF0aW9uLCB0aGlzLm1vZGVsLCB0aGlzLm1vZGVsQ2hhbmdlZCwgdGhpcy5jZCwgdGhpcy5zZWxlY3RlZE9iamVjdHMsXG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZHJvcE5vZGUsIHRoaXMudXNlckNhbGxiYWNrcy5jcmVhdGVFZGdlLCB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZUFkZGVkLCB0aGlzLnVzZXJDYWxsYmFja3Mubm9kZVJlbW92ZWQsXG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZVJlbW92ZWQsIGVsZW1lbnRbMF0sIGVsZW1lbnRbMF0ucXVlcnlTZWxlY3Rvcignc3ZnJykpO1xuXG4gICAgaWYgKHRoaXMuZHJvcFRhcmdldElkKSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kcm9wVGFyZ2V0SWQgPSB0aGlzLmRyb3BUYXJnZXRJZDtcbiAgICB9XG5cbiAgICBjb25zdCBhcHBseUZ1bmN0aW9uID0gdGhpcy56b25lLnJ1bi5iaW5kKHRoaXMuem9uZSk7XG5cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlKHRoaXMubW9kZWxTZXJ2aWNlLCBhcHBseUZ1bmN0aW9uLFxuICAgICAgICAgIHRoaXMuYXV0b21hdGljUmVzaXplLCB0aGlzLmRyYWdBbmltYXRpb24pO1xuXG4gICAgdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlID0gbmV3IEZjRWRnZURyYWdnaW5nU2VydmljZSh0aGlzLm1vZGVsVmFsaWRhdGlvbiwgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UsIHRoaXMubW9kZWxTZXJ2aWNlLFxuICAgICAgdGhpcy5tb2RlbCwgdGhpcy51c2VyQ2FsbGJhY2tzLmlzVmFsaWRFZGdlIHx8IG51bGwsIGFwcGx5RnVuY3Rpb24sXG4gICAgICB0aGlzLmRyYWdBbmltYXRpb24sIHRoaXMuZWRnZVN0eWxlKTtcblxuICAgIHRoaXMubW91c2VvdmVyU2VydmljZSA9IG5ldyBGY01vdXNlT3ZlclNlcnZpY2UoYXBwbHlGdW5jdGlvbik7XG5cbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UgPSBuZXcgRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlKHRoaXMubW9kZWxTZXJ2aWNlLFxuICAgICAgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0LXJlY3RhbmdsZScpLCBhcHBseUZ1bmN0aW9uKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgbm9kZURyYWdzdGFydDogdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdzdGFydC5iaW5kKHRoaXMubm9kZURyYWdnaW5nU2VydmljZSksXG4gICAgICBub2RlRHJhZ2VuZDogdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdlbmQuYmluZCh0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdzdGFydDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdzdGFydC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ2VuZDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdlbmQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyb3A6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcm9wLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnb3ZlckNvbm5lY3RvcjogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyQ29ubmVjdG9yLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnb3Zlck1hZ25ldDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyTWFnbmV0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnbGVhdmVNYWduZXQ6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnbGVhdmVNYWduZXQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgbm9kZU1vdXNlT3ZlcjogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLm5vZGVNb3VzZU92ZXIuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgbm9kZU1vdXNlT3V0OiB0aGlzLm1vdXNlb3ZlclNlcnZpY2Uubm9kZU1vdXNlT3V0LmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIGNvbm5lY3Rvck1vdXNlRW50ZXI6IHRoaXMubW91c2VvdmVyU2VydmljZS5jb25uZWN0b3JNb3VzZUVudGVyLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIGNvbm5lY3Rvck1vdXNlTGVhdmU6IHRoaXMubW91c2VvdmVyU2VydmljZS5jb25uZWN0b3JNb3VzZUxlYXZlLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIG5vZGVDbGlja2VkOiAoZXZlbnQsIG5vZGUpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaGFuZGxlQ2xpY2tlZChub2RlLCBldmVudC5jdHJsS2V5KTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmFkanVzdENhbnZhc1NpemUoZmFsc2UpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICBjb25zdCBub2Rlc0NoYW5nZSA9IHRoaXMubm9kZXNEaWZmZXIuZGlmZih0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIGNvbnN0IGVkZ2VzQ2hhbmdlID0gdGhpcy5lZGdlc0RpZmZlci5kaWZmKHRoaXMubW9kZWwuZWRnZXMpO1xuICAgICAgbGV0IG5vZGVzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgbGV0IGVkZ2VzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgaWYgKG5vZGVzQ2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgIG5vZGVzQ2hhbmdlLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIG5vZGVzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBub2Rlc0NoYW5nZS5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIG5vZGVzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVkZ2VzQ2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgIGVkZ2VzQ2hhbmdlLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIGVkZ2VzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGdlc0NoYW5nZS5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIGVkZ2VzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLmFkanVzdENhbnZhc1NpemUoZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCB8fCBlZGdlc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RWRnZURBdHRyaWJ1dGUoZWRnZTogRmNFZGdlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc291cmNlQ29vcmQoZWRnZSksXG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZXN0Q29vcmQoZWRnZSksIHRoaXMuZWRnZVN0eWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGp1c3RDYW52YXNTaXplKGZpdD86IGJvb2xlYW4pIHtcbiAgICBsZXQgbWF4WCA9IDA7XG4gICAgbGV0IG1heFkgPSAwO1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG1heFggPSBNYXRoLm1heChub2RlLnggKyB0aGlzLm5vZGVXaWR0aCwgbWF4WCk7XG4gICAgICBtYXhZID0gTWF0aC5tYXgobm9kZS55ICsgdGhpcy5ub2RlSGVpZ2h0LCBtYXhZKTtcbiAgICB9KTtcbiAgICBsZXQgd2lkdGg7XG4gICAgbGV0IGhlaWdodDtcbiAgICBpZiAoZml0KSB7XG4gICAgICB3aWR0aCA9IG1heFg7XG4gICAgICBoZWlnaHQgPSBtYXhZO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IE1hdGgubWF4KG1heFgsIGVsZW1lbnQucHJvcCgnb2Zmc2V0V2lkdGgnKSk7XG4gICAgICBoZWlnaHQgPSBNYXRoLm1heChtYXhZLCBlbGVtZW50LnByb3AoJ29mZnNldEhlaWdodCcpKTtcbiAgICB9XG4gICAgZWxlbWVudC5jc3MoJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgICBlbGVtZW50LmNzcygnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICBjYW52YXNDbGljayhldmVudDogTW91c2VFdmVudCkge31cblxuICBlZGdlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGVkZ2VDbGljayhldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZSwgZXZlbnQuY3RybEtleSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VSZW1vdmUoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VFZGl0KGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRWRpdCkge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VFZGl0KGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlTW91c2VPdmVyKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmVkZ2VNb3VzZUVudGVyKGV2ZW50LCBlZGdlKTtcbiAgfVxuXG4gIGVkZ2VNb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuZWRnZU1vdXNlTGVhdmUoZXZlbnQsIGVkZ2UpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyKGV2ZW50KTtcbiAgICB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXIoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZS5kcm9wKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZWRvd24oZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgbW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNlbW92ZShldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcbiAgbW91c2V1cChldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZXVwKGV2ZW50KTtcbiAgfVxuXG59XG4iXX0=